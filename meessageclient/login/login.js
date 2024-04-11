async function myFunc(e){
    e.preventDefault();
    try{
        let email=document.getElementById('email').value;
        let password=document.getElementById('password').value;
        let detail={
            email:email,
            password:password
        }
        console.log(detail);
        let login = await axios.post('http://localhost:3000/login',detail).then(response=>{
            if(response.status===200){
                alert(response.data.message);
                localStorage.setItem('token',response.data.token);
                window.location.href='../chatapp/chatapp.html';
            }else{
                throw new Error(response.data.message);
            }
        });
    }catch(err){
        console.log(err);
        console.log(err.response.data.message);
        const fullMessage=err.response.data.message +"  error:" +err.request.status;
        console.log(fullMessage);
        alert(fullMessage);
    }
};

document.addEventListener('click',()=>{
    const skills=document.getElementById('signup');
    skills.onclick=()=>{
    console.log('skills tag clicked')
    window.location.href='../signup/signup.html'
}
})

// const skills=document.getElementById('signup');
// skills.onclick=()=>{
//     console.log('skills tag clicked')
//     window.location.href='../signup/signup.html'
// }