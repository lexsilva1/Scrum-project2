// ID do botão loginButton
document.getElementById('loginButton').addEventListener('click', function() {
    var loginValue = document.getElementById('login').value.trim();
    var passwordValue = document.getElementById('password').value.trim();
    if (loginValue === '' || passwordValue === '') {
        document.getElementById('warningMessage').innerText = 'Fill in your username and password';
    } else {
        // Limpa mensagem de erro
        document.getElementById('warningMessage').innerText = '';
        login(loginValue, passwordValue);
    }
});
document.getElementById('registerButton').addEventListener('click',()=>{
    window.location.href='registry.html';
})
async function login(loginValue, passwordValue) {
    // Send GET request with username and password as query parameters
    try {
        const response = await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/login?username=${loginValue}&password=${passwordValue}`);
        
        if (response.status === 200) {
            // User is logged in successfully
            alert('User is logged in successfully :)');
            const userData = await response.json();
            
            // Store user data in sessionStorage
            sessionStorage.setItem('userId', userData.id);
            sessionStorage.setItem('username', userData.username);
            sessionStorage.setItem('email', userData.email);
            // Add other user properties as needed
            
            // Redirect to index.html after successful login
            window.location.href = 'home.html';
        } else if (response.status === 404) {
            // User not found
            alert('User not found');
        } else {
            // Something went wrong
            alert('Something went wrong :(');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

//adicionar aqui a funcionalidade para ir para a pagina de registo
