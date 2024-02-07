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
    newUser.LastName = document.getElementById('userLastName').value;
    newUser.Email = document.getElementById('userEmail').value;
    newUser.Username = document.getElementById('userUsername').value;
    newUser.Password = document.getElementById('userPassword').value;
    for (const [Key, value] of Object.entries(newUser)){
        if (value == ''){
            alert (Key + ' is empty');
            break;
        }
        window.location.href='index.html';
    }
})
//carregar cancel leva à pagina login
document.getElementById('cancelRegistryButton').addEventListener('click',()=>{
    window.location.href='index.html'
})