//objecto user
let newUser={
    Id : '',
    Name: '',    
    Email: '',
    Username: '',
    Password: '',
};
//funcionalidade dos botoes 
document.getElementById('submitRegistryButton').addEventListener('click',()=>{
    newUser.Name = document.getElementById('userFirstName').value.trim()+' '+document.getElementById('userLastName').value.trim();
    newUser.Email = document.getElementById('userEmail').value.trim();
    newUser.Username = document.getElementById('userUsername').value.trim();
    newUser.Password = document.getElementById('userPassword').value.trim();
    newUser.Id = 'user'+Math.floor(Math.random()*1000);
    /*for (const [Key, value] of Object.entries(newUser)){
        if (value == ''){
            alert (Key + ' is empty');
            break;
        }*/
        
    if (newUser.Password != document.getElementById('userRewrittenPassword').value.trim()){
        alert('Passwords do not match');
    }
    else{
        postUser();
        window.location.href='index.html';
    }
})
async function postUser(){
    const response = await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/add', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
    });
    console.log(response);
    return response.json();
}
//carregar cancel leva à pagina login
document.getElementById('cancelRegistryButton').addEventListener('click',()=>{
    window.location.href='index.html'
})