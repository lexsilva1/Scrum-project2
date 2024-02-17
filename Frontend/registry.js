//objecto user

//funcionalidade dos botoes
document.addEventListener('DOMContentLoaded',()=>{ 
document.getElementById('submitRegistryButton').addEventListener('click',(e)=>{
    e.preventDefault();
    if (document.getElementById('userPassword').value.trim() != document.getElementById('userRewrittenPassword').value.trim()){
        alert('Passwords do not match');
    } else {
    let newUser = {
        id : 'user'+Math.floor(Math.random()*1000),
        username : document.getElementById('userUsername').value.trim(),
        name : document.getElementById('userFirstName').value.trim()+' '+document.getElementById('userLastName').value.trim(),
        email : document.getElementById('userEmail').value.trim(),
        password : document.getElementById('userPassword').value.trim(),
        contactNumber : document.getElementById('userNumber').value.trim(),
        userPhoto : document.getElementById("userPhotoUrl").value.trim()
        }
        
        console.log(JSON.stringify(newUser));
        console.log(newUser);
        postUser(newUser);
        window.location.href='index.html';

        //verificação frontend de credenciais
        const emptyFields = [];
        for (const [key,value] of Object.entries(newUser)){
            if (value.trim()===''){
                emptyFields.push(key);
            }
        }
        emptyFields.forEach(field =>{
            console.log('Field ' + field + ' needs to be filled'); 
            /*
            const messageBox = document.createElement('div');
            const message = document.createElement('span');
            messageBox.appendChild(message);
            message.textContent = 'Please fill this field';
            message.style.color = 'wheat';*/
        })      
        //password checks with rewritten password 
        const passwordCheck = newUser.password === document.getElementById('userRewrittenPassword').value;
        if (passwordCheck){
            console.log("password checks out");
        }   
}
})
});
//função que cria novo utilizador
async function postUser(newUser){
    // Send POST request with newUser data
     try {
         await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/add',{
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(function (response) {
            if (response.status == 200) {
            alert('user is added successfully :)');
            } else {
            alert('something went wrong :(');
            console.log(response.status);
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
//função para transformar a password em texto
document.addEventListener('click', (e)=>{
    if (e.target.matches('.fa-regular')){
        const seePassword = document.querySelectorAll('input[type="password"]');
        seePassword.type = 'text';
        alert("clicking eye")
    }
  })

