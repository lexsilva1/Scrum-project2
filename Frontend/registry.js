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
        photo : document.getElementById("userPhotoUrl").value.trim()
        }

        console.log(JSON.stringify(newUser));
        postUser(newUser);

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
        console.log(emptyFields); 

        /*if (
        !nameIsBlank(newUser)&&
        !passwordIsBlank(newUser)&&
        !emailIsBlank(newUser)&&
        !contactNumberIsBlank(newUser)&&
        !checkUsername(newUser)&&
        passwordCheck&&
        emptyFields===0
        ){
            alert("user pode ser criado");
        } else {
            alert("user nao pode ser criado")
            console.log()
        }*/
        
        
        //window.location.href='index.html';
    
}
})
});
async function contactNumberIsBlank(newUser){
    try{
        await fetch ('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/contactNumberIsBlank',{
        method: 'POST',
        headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    }).then(function(response){
        console.log(response.status)
        if (response.status == 404){
            alert ("contact field is empty");
        }
    })
    } 
    catch(error){
        console.log('error:', error);
    }
}
async function passwordIsBlank(newUser){
    try{
        await fetch ('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/passwordIsBlank',{
        method: 'POST',
        headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    }).then(function(response){
        console.log(response.status)
        if (response.status == 404){
            alert ("password field is empty");
        }
    })
    } 
    catch(error){
        console.log('error:', error);
    }
}
async function emailIsBlank(newUser){
    try{
        await fetch ('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/emailIsBlank',{
        method: 'POST',
        headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    }).then(function(response){
        console.log(response.status)
        if (response.status == 404){
            alert ("email field is empty");
        }
    })
    } 
    catch(error){
        console.log('error:', error);
    }
}
async function nameIsBlank(newUser){
    try{
        await fetch ('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/nameIsBlank',{
        method: 'POST',
        headers:{
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    }).then(function(response){
        console.log(response.status)
        if (response.status == 404){
            alert ("name field is empty");
        }
    })
    } 
    catch(error){
        console.log('error:', error);
    }
}
async function checkUsername(newUser){
    try{
        await fetch ('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/checksUsername',{
            method: 'POST',
            headers:{
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(function(response){
            console.log(response.status);
            if (response.status == 200){
                alert('Username already exists')
            } else {
                alert('username does not exist')
            }
        });
        
    } 
    catch (error){
        console.log('error:', error);
    }
}

//função que cria novo utilizador
async function postUser(newUser){
    // Send POST request with newUser data
     try {
         await fetch('http://localhost:8080/my_scrum_backend_war_exploded/rest/user/add', {
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

