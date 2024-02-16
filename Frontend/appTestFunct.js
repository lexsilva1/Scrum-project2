//Funcoes registo
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
//funcoes scrum
function createTask(name, description, priority,startdate,enddate) { // Cria uma tarefa com o nome, a descrição e a priority passados como argumentos 
    const task = {
    title :name,
    description: description,
    priority: priority,
    startDate: startdate,
    endDate: enddate,
    }
    return task;
  }
async function postTask(task) {
    await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/addtask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': sessionStorage.getItem('username'),
        'password': sessionStorage.getItem('password')
      },
      body: JSON.stringify(task)
    }).then(function(response){
      if (response.status === 200){
        alert('Task added');
      }else if (response.status === 404){
        alert('User not found');
      }
    });
  }
function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.id = task.id;
    taskElement.priority = task.priority;
    taskElement.classList.add('task'); 
    if (task.priority === 100) {
        taskElement.classList.add('low');
    } else if (task.priority === 200) {
        taskElement.classList.add('medium');
    } else if (task.priority === 300) {
        taskElement.classList.add('high');
    }
    taskElement.draggable = true;
    taskElement.description = task.description;
    taskElement.title = task.title;
    if(task.status === 10){
    taskElement.status = "todo";
    }else if(task.status === 20){
    taskElement.status = "doing";
    }else if(task.status === 30){
    taskElement.status = "done";
    }
    taskElement.startdate = task.startDate;
    taskElement.enddate = task.endDate;

    const postIt = document.createElement('div');
    postIt.className = 'post-it';

    const taskTitle = document.createElement('h3');
    taskTitle.textContent = task.title;
    const descriprioncontainer = document.createElement('div');
    descriprioncontainer.className = 'post-it-text';
    const displayDescription = document.createElement('p');
    displayDescription.textContent = task.description;

    const deleteButton = document.createElement('img');
    deleteButton.src = 'multimedia/dark-cross-01.png';
    deleteButton.className = 'apagarButton';
    deleteButton.addEventListener('click', function () {
        const  deletemodal = document.getElementById('delete-modal');
         deletemodal.style.display = "grid"; 
        const deletebtn = document.getElementById('delete-button');
        deletebtn.addEventListener('click', () => {
            deleteTask(taskElement.id);
            taskElement.remove();
            deletemodal.style.display = "none";
        });
        const cancelbtn = document.getElementById('cancel-delete-button');
        cancelbtn.addEventListener('click', () => {
            deletemodal.style.display = "none";
        });
    });
    descriprioncontainer.appendChild(displayDescription);
    postIt.appendChild(taskTitle);
    postIt.appendChild(deleteButton);
    taskElement.appendChild(postIt);
    postIt.appendChild(descriprioncontainer);
    taskElement.addEventListener('dblclick', function () {
        sessionStorage.setItem("taskDescription", taskElement.description);
        sessionStorage.setItem("taskTitle", taskElement.title);
        sessionStorage.setItem("taskid", taskElement.id);
        sessionStorage.setItem("taskStatus", taskElement.status);
        sessionStorage.setItem("taskPriority", taskElement.priority);
        sessionStorage.setItem("taskStartDate", task.startDate);
        sessionStorage.setItem("taskEndDate", task.endDate);
        window.location.href = 'task.html';
    });
    console.log(taskElement);

    return taskElement;
}
async function loadTasks() {

    await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/tasks', {
     method: 'GET',
     headers: {
       'Content-Type': 'application/json',
       'username': sessionStorage.getItem('username'),
       'password': sessionStorage.getItem('password')
     }
   }).then(async function(response){
     if (response.status === 200){
       const taskArray = await response.json();
       
       if (taskArray.length > 0) {
         taskArray.forEach(task => {
           const taskElement = createTaskElement(task);
           if (task.status === 10) {
             document.getElementById('todo').appendChild(taskElement);
           } else if (task.status === 20) {
             document.getElementById('doing').appendChild(taskElement);
           }else if (task.status === 30) {
             document.getElementById('done').appendChild(taskElement);
           }
           attachDragAndDropListeners(taskElement);
         });
       }
       
     }else if (response.status === 404){
       alert('User not found');
     }else if (response.status === 401){
       alert('Unauthorized');
     }
   });
 }
async function deleteTask(id) {
    try {
      const response = await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/removetask', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'username': sessionStorage.getItem('username'),
          'password': sessionStorage.getItem('password'),
          'id': id
        }
      });
  
      if (response.ok) {
        alert('Task deleted');
      } else if (response.status === 404) {
        alert('Task not found');
      } else if (response.status === 401) {
        alert('Unauthorized');
      } else {
        // Handle other response status codes
        console.error('Unexpected response:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle fetch errors
      alert('Error deleting task. Please try again.');
    }
  }
async function updateTask(taskElement) {
    console.log(taskElement.startDate);
    console.log(taskElement.endDate);
   let taskElementstatus;
    if(taskElement.status === "todo"){
      taskElementstatus = 10
    }else if(taskElement.status === "doing"){
      taskElementstatus = 20
    }else if(taskElement.status === "done"){
      taskElementstatus = 30
    }
    let task = {
      id: taskElement.id,
      title: taskElement.title,
      description: taskElement.description,
      priority: taskElement.priority,
      startDate: taskElement.startdate,
      endDate: taskElement.enddate,
      status: taskElementstatus
    };
  
    try {
      const response = await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/updatetask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'username': sessionStorage.getItem('username'),
          'password': sessionStorage.getItem('password')
        },
        body: JSON.stringify(task)
      });
  
      if (response.ok) {
        console.log('Task updated');
      } else if (response.status === 404) {
        console.log('Task not found');
      } else if (response.status === 401) {
        console.log('Unauthorized');
      } else {
        // Handle other response status codes
        console.error('Unexpected response:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle fetch errors
      alert('Error updating task. Please try again.');
    }


  }
function updateDate() { // Mostra a data atual
    let today = new Date();
  
    let dayName = today.getDay(), // 0 - 6
      dayNum = today.getDate(), // 1 - 31
      month = today.getMonth(), // 0 - 11
      year = today.getFullYear(); // 2020
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // Valor -> ID do elemento html
    const IDCollection = ["day", "daynum", "month", "year"]; // Array com os IDs dos elementos html que vão mostrar a data
    // Retornar um array com números como índices
    const val = [dayWeek[dayName], dayNum, months[month], year]; // Array com os valores que vão ser mostrados nos elementos html
    for (let i = 0; i < IDCollection.length; i++) { // Percorre o array de IDs
      document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i]; // Altera o valor do elemento html com o ID correspondente
    }
  }
//funcoes login
async function login(loginValue, passwordValue) {
    // Send GET request with username and password as query parameters
    try {
        await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/login?username=${loginValue}&password=${passwordValue}`, {
            method: 'GET',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                username: loginValue,
                password: passwordValue,
            }
        }).then(async function(response) {
            if (response.status === 200) {
                // User is logged in successfully
                alert('User is logged in successfully :)');
                const userData = await response.json();
                
                // Store user data in sessionStorage
                sessionStorage.setItem('password', userData.password);
                sessionStorage.setItem('username', userData.username);
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
        });
    } catch (error) {
        console.error('Error:', error);
    }

}
//funcoes task
async function updateTask() {
    let taskElementstatus=sessionStorage.getItem("taskStatus");

    if(taskElementstatus === "todo"){
      taskElementstatus = 10
    }else if(taskElementstatus === "doing"){
      taskElementstatus = 20
    }else if(taskElementstatus === "done"){
      taskElementstatus = 30
    }
     let task = {
         id: sessionStorage.getItem("taskid"),
         title: document.getElementById("titulo-task").value.trim(),
         description: document.getElementById("descricao-task").value.trim(),
         status: taskElementstatus,
         priority: sessionStorage.getItem("taskPriority"),
         startDate: document.getElementById('startdate').value,
         endDate: document.getElementById('enddate').value

      };
   
     try {
       const response = await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/updatetask', {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json',
           'username': sessionStorage.getItem('username'),
           'password': sessionStorage.getItem('password')
         },
         body: JSON.stringify(task)
       });
   
       if (response.ok) {
         console.log('Task updated');
       } else if (response.status === 404) {
         console.log('Task not found');
       } else if (response.status === 401) {
         console.log('Unauthorized');
       } else {
         // Handle other response status codes
         console.error('Unexpected response:', response.status);
       }
     } catch (error) {
       console.error('Error updating task:', error);
       // Handle fetch errors
       alert('Error updating task. Please try again.');
     }
   }
//Funcoes editar perfil 
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