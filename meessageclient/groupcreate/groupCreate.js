var urlParams = new URLSearchParams(window.location.search);
console.log(urlParams)
var token = urlParams.get("token");
localStorage.setItem('token',token);
console.log(token);

const nameSubmit=document.getElementById('nameSubmit');
nameSubmit.addEventListener('click',async(e)=>{
    e.preventDefault();
    const groupName=document.getElementById('groupname').value;
    console.log(token,"    group name     ",groupName)
    await axios.post('http://localhost:3000/group/namecreate',{name:groupName},{headers:{'Authorization':token}}).then((response)=>{
        console.log(response);
    });
})

