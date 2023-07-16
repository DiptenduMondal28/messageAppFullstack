const AWS=require('aws-sdk');
require('dotenv').config();

const uploadToS3 = (data,filename)=>{
    const BUCKET_NAME=process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY=process.env.AWS_ACCESS_KEY;
    const IAM_USER_SECRET=process.env.AWS_SECRET_KEY;

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
        //Bucket:BUCKET_NAME
    })
    var params={
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,response)=>{
            if(err){
                console.log("something wrong with upload data in s3 create bucket:",err)
                reject(err)
            }else{
                console.log("success:",response);
                resolve(response.Location);
            }
        })
    })
}

module.exports=uploadToS3;