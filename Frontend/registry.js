//objecto user
let newUser={
    FirstName: '',
    LastName: '',
    Email: '',
    Username: '',
    Password: '',
};
//funcionalidade dos botoes 
document.getElementById('submitRegistryButton').addEventListener('click',()=>{
    newUser.FirstName = document.getElementById('userFirstName').value.trim();
    newUser.LastName = document.getElementById('userLastName').value.trim();
    newUser.Email = document.getElementById('userEmail').value.trim();
    newUser.Username = document.getElementById('userUsername').value.trim();
    newUser.Password = document.getElementById('userPassword').value.trim();
    const rewritePassword = document.getElementById('userRewrittenPassword').value.trim();
    const allFieldsFilled = Object.values(newUser).every(value => value != "");
    const passwordMatch = newUser.Password === rewritePassword;

    
    //ver se é preferivel fazer um loop pelos valores e identificar qual dos campos nao esta preenchido
    //const emptyFields = []
    /*for [key,value] of Object.entries(newUser){
        if (value === ''){
            emptyFields.push(key);
        }
    }
    if (emptyFields===0){
        console.log('submit the form')
    } else {
        if (emptyFields > 0){
            console.log('Please fill the following fields : ${emptyFields.join(',')})');
        }
    }

        */
        
    
    if (allFieldsFilled && passwordMatch){
        console.log('all fields are filled, submit new user');
        window.location.href='index.html'
    } else {
        if(!allFieldsFilled){
            console.log("please fill all fields");
        }
        if(!passwordMatch){
            console.log("password does not match, please re-enter your password");
        }
    }

})
//carregar cancel leva à pagina login
document.getElementById('cancelRegistryButton').addEventListener('click',()=>{
    window.location.href='index.html'
})