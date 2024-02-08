//objecto user

//funcionalidade dos botoes
document.addEventListener('DOMContentLoaded',()=>{ 
document.getElementById('submitRegistryButton').addEventListener('click',(e)=>{
    e.preventDefault();
    let newUser = {
        id : 'user'+Math.floor(Math.random()*1000),
        username : document.getElementById('userUsername').value.trim(),
        name : document.getElementById('userFirstName').value.trim()+' '+document.getElementById('userLastName').value.trim(),
        email : document.getElementById('userEmail').value.trim(),
        password : document.getElementById('userPassword').value.trim(),
        }
        console.log(JSON.stringify(newUser));

        postUser(newUser);
        //window.location.href='index.html';
    
})
})
async function postUser(newUser){
   
    if (newUser.Password != document.getElementById('userRewrittenPassword').value.trim()){
        alert('Passwords do not match');
    }
     // Send POST request with newUser data
     try {
         await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/add', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(function (response) {
            if (response.status == 200) {
            alert('user is added successfully :)');
            addActivityToTable(activity);
            } else {
            alert('something went wrong :(');
            }
            });
}
catch (error) {
    console.error('Error:', error);
}
}

//carregar cancel leva à pagina login
document.getElementById('cancelRegistryButton').addEventListener('click',()=>{
    window.location.href='index.html'
})