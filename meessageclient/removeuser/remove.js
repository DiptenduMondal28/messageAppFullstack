const button = document.getElementById('useridSubmit');
const urlParams = new URLSearchParams(window.location.search);
const groupid = urlParams.get('id');
const token = urlParams.get('token');
console.log("group id:",groupid,'token:',token);
button.addEventListener('click',async(event)=>{
    event.preventDefault();
    const userid=document.getElementById('userid').value;
    await axios.delete(`http://localhost:3000/group/removeuser?groupid=${groupid}&deleteid=${userid}`,{headers:{'Authorization':token}}).then(result=>{
        console.log(result);
        alert(result.data.message);
    }).catch(err=>{
        console.log(err);
        alert(err.response.data.message+' go back to the chat page');
    })
})