//placeholder do username tem de ter o nome do user
//os placeholders dos campos tem de ter os valores do objeto introduzidos no registo
//tem de aparecer a foto e tem de ser possivel adicionar outra foto/ alterar o tipo de campo 
//aparecer um modal para confirmar que se quer fazer as novas alterações

//fazer uma função que faça fetch ao objeto de utilizador
//preencher os campos com os atributos do objeto que se foi buscar pelo fetch
//quando se submete as novas informações, alterar os dados do objeto pelo patch do username 
window.onload = async function(){
    let user = await getUserData();    
    const nomes = user.name.split(" ");
    document.getElementById('editFirstName').value = nomes[0];
    document.getElementById('editLastName').value = nomes[1];
    document.getElementById('profileImage').src = user.userPhoto;
    document.getElementById('photoUpload').value = user.userPhoto;
    document.getElementById('editUserEmail').value = user.email;
    document.getElementById('editUserContact').value= user.contactNumber;
    document.getElementById('oldPassword').value = user.password;
    document.getElementById('username').value = user.username;

    document.getElementById('buttonSubmitData').addEventListener('click',()=>{
        user = {
        name : document.getElementById('editFirstName').value.trim()+' '+document.getElementById('editLastName').value.trim(),
        email: document.getElementById('editUserEmail').value.trim(),
        password : document.getElementById('editNewPassword').value.trim(),
        contactNumber : document.getElementById('editUserContact').value.trim(),
        userPhoto : document.getElementById("profileImage").src = document.getElementById('photoUpload').value.trim(),
        }
        updateUserData(user);
        console.log(user);
    })
}




async function getUserData(){
    try{
        const response = await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/${sessionStorage.getItem('username')}`);
        if (!response.ok){
        throw new Error ('failed to fetch user data');
        }
        const obj = await response.json();
        return obj;
    } catch (error){
        console.error('something went wrong', error);
        throw error;
    }
}


async function updateUserData(user){//chama o user aqui
    try{
    const response = await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/update`,{
        method: 'PUT',
        headers:{
            'Accept':'*/*',
            'Content-Type':'application/json',
            'username': sessionStorage.getItem('username'),
            'password': sessionStorage.getItem('password'),
        },
        body:JSON.stringify(user),
    }).then(function(response){
        console.log(response.status);
        if (response.status ==404){
            console.log('username not found')
        } else if(response.status == 405){
            console.log('forbidden due to header params')
        } else if(response.status == 400){
            console.log('failed, user not updated')
        } else if(response.status == 200){
            console.log('user updated sucessfully')
        }
    })
    } catch(error){
        console.error('error',error);
    }


}
//abrir modal para confirmar alterações 
document.getElementById('buttonCancelEdition').addEventListener('click',()=>{
    window.location.href='home.html';
})
function fieldVerification(){

}
