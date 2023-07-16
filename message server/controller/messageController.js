const Message=require('../module/message');
const { where } = require('sequelize');
const User=require('../module/signup')
const Group=require('../module/group');
const message = require('../module/message');
const AWS=require('aws-sdk');
require('dotenv').config();

module.exports.messageSent=async(req,res,next)=>{
    console.log('user message sent',req.body);
    console.log(req.user.id)
    await Message.create({
        message:req.body.message,
        userId:req.user.id,
        groupId:req.body.groupid
    }).then(result=>{
        console.log(result);
    })
};

module.exports.getreply=async(req,res,next)=>{
    try{
        console.log('group id',req.query.group);
        console.log(typeof(req.query.Group))
        console.log('another req  query:',req.query)
        const totalMessage=await Message.count();
        await Message.findAll({
            where:{groupId:Number(req.query.group)},
            include:[User,Group],
        }).then((messages)=>{
            // console.log(messages);
            res.json({message:messages})
        })
    }catch(err){
        console.log(err);
    }
    
};

module.exports.lastMessage=async(req,res,next)=>{
    console.log('what is request',req.query);
    try{
        const groupId = parseInt(req.query.group);
        const lastMessage = await Message.findOne({
            where: {
                groupId: groupId
            },
            order: [['createdAt', 'DESC']],
            include:[User,Group]
        }).then(result=>{
            console.log(result)
            res.status(200).json(result);
        }).catch(err=>{
            console.log(err);
        })
    }
    catch(err){
        console.log(err);
    }


}

module.exports.fileHandle=async(req,res,next)=>{
    console.log('file type',req.file);
    const file=req.file;
    console.log('file user name',req.user.id);
    const userId=req.user.id;
     console.log('group id:',req.query.groupid);
    const groupId=req.query.groupid;
    if(file && userId && groupId){
        try{
            const filename=`file${new Date()}.jpg`;
            const fileUrl=await uploadToS3(file.buffer,filename);
            console.log(fileUrl);
            await Message.create({
                message:fileUrl,
                userId:userId,
                groupId:groupId
            }).then(result=>{
                console.log(result);
            }).catch(err=>{
                console.log(err)
            })

            res.status(200).json({message:'successfully upload to server'})
        }catch(err){
            console.log(err)
            res.status(400).json({message:'failed to upload'})
        }
    }else{
        res.status(401).json({message:'unauthorized access'})
    }
//     console.log(req.query.groupid)
//     console.log(req.user.id)
//     if (req.file) {
//         // File was uploaded successfully
//         console.log(req.file)
//         console.log('file upload successfull');
//         res.status(200).json({ message: 'File uploaded successfully' });
//       } else {
//         // No file was received
//         console.log('file upload UN-successfull');
//         res.status(400).json({ message: 'No file received' });
//       }
}



const uploadToS3 =async (data, filename) => {
    const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY = process.env.AWS_ACCESS_KEY;
    const IAM_USER_SECRET = process.env.AWS_SECRET_KEY;
  
    let s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
    });
    console.log(data,filename);
    var params = {
      Bucket: BUCKET_NAME,
      Key: filename,
      Body: data,
      ACL: 'public-read',
    };
  
    return new Promise((resolve, reject) => {
      s3bucket.upload(params, (err, response) => {
        if (err) {
          console.log('Something went wrong with uploading data to S3:', err);
          reject(err);
        } else {
          console.log('Successfully uploaded to S3:', response);
          resolve(response.Location);
        }
      });
    });
  };

