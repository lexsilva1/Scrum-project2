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

        //verificação frontend de credenciais
        const emptyFields = [];
        for (const [key,value] of Object.entries(newUser)){
            if (value.trim()===''){
                emptyFields.push(key);
            }
        }
        if (emptyFields.length>0){
            for (const key of emptyFields){
            console.log('Field ' + key + ' needs to be filled'); 
            }
        }
        //password checks with rewritten password 
        const passwordCheck = newUser.password === document.getElementById('userRewrittenPassword').value;
        if (passwordCheck){
            console.log("password checks out");
        }
        console.log(emptyFields);    
        nameIsBlank(newUser);
        passwordIsBlank(newUser);
        emailIsBlank(newUser);
        checkUsername(newUser);
        //postUser(newUser);
        //window.location.href='index.html';
    
})
})
async function passwordIsBlank(newUser){
    try{
        await fetch ('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/passwordIsBlank',{
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
        await fetch ('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/emailIsBlank',{
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
        await fetch ('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/nameIsBlank',{
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
        await fetch ('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/checksUsername',{
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