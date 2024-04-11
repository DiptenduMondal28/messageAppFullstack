async function submitdata(event){
    event.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let ph=document.getElementById('no').value;
    let password=document.getElementById('password').value;
    let confirm=document.getElementById('confirm').value;
    if(password!=confirm){
       document.querySelector('#small').innerHTML='password not match';
    }else{

        let details={
            name:name,
            email:email,
            ph:ph,
            password:password
        }
        console.log(details);
        document.querySelector('#small').innerHTML='';
        let dataCreation = await axios.post('http://localhost:3000/signup/createuser',details).then(result=>{
            console.log(result)
            if(result.request.status===200){
                alert("user created successfully");
                window.location.href='../login/login.html'
            }else if(response.request.status===409){
                alert('user already exixt')
            }else{
                alert('something wrong');
            }
        }).catch((err)=>{
            console.log(err);
        })
        
    }
};