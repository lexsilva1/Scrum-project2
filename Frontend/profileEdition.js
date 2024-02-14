//placeholder do username tem de ter o nome do user
//os placeholders dos campos tem de ter os valores do objeto introduzidos no registo
//tem de aparecer a foto e tem de ser possivel adicionar outra foto/ alterar o tipo de campo 
//aparecer um modal para confirmar que se quer fazer as novas alterações

//fazer uma função que faça fetch ao objeto de utilizador
//preencher os campos com os atributos do objeto que se foi buscar pelo fetch
//quando se submete as novas informações, alterar os dados do objeto pelo patch do username 
window.onload = function(){
    getUserData();
     
}

async function getUserData(){
    try{
        const response = await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/${sessionStorage.getItem('username')}`);
        if (!response.ok){
        throw new Error ('failed to fetch user data');
    }
    const obj = await response.json();
    console.log(obj);
    document.getElementById('firstName').textContent = obj.name;
    document.getElementById('profileImage').src = obj.userPhoto;
    document.getElementById('username').innerHTML = obj.username;
    return obj.userPhoto;
} catch (error){
    console.error('something went wrong', error);
    throw error;
}
}
document.getElementById('buttonCancelEdition').addEventListener('click',()=>{
    window.location.href='home.html';
})