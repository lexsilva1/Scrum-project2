window.onload = async function () {
    loadTasks();
    updateDate();
    showTime();
    document.getElementById('profileImageHome').src = await getUserPhoto();
    let user = await getUserData();    
    let names = user.name.split(" ");
    document.getElementById('login-home').textContent = names[0];
  };

  if(sessionStorage.getItem('username') === null || sessionStorage.getItem('username') === ''){
    window.location.href = 'index.html';
  }
let tasks = document.querySelectorAll('.task');
const panels = document.querySelectorAll('.panel')

function attachDragAndDropListeners(task) { // Adiciona os listeners de drag and drop a uma tarefa criada dinamicamente
  task.addEventListener('dragstart', () => {
      task.classList.add('dragging')
  });
  task.addEventListener('dragend', () => {
      task.classList.remove('dragging')
      updateTask(task);
  });
}
// Adiciona os listeners de drag and drop a um painel
panels.forEach(panel => { 
  panel.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(panel, e.clientY)
    const task = document.querySelector('.dragging')
    const panelID = document.getElementById(panel.id) // Guarda o ID do painel onde a tarefa vai ser colocada
    if (afterElement == null) {
      panel.appendChild(task)
      task.status = panel.id;
      for (var i = 0; i < tasks.length; i++) { // Percorre o array de tarefas e altera o status da tarefa para o painel onde foi colocada
        if (tasks[i].id == task.id) {
          tasks[i].status = panelID; // Atualiza o status da tarefa
        }
      }
      
    } else {
      panel.insertBefore(task, afterElement)
      task.status = panel.id;
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == task.id) {
          tasks[i].status = panelID;
        }
      }
    }
  })
})

// Definir os botões de priority
const lowButton = document.getElementById("low-button-home");
const mediumButton = document.getElementById("medium-button-home");
const highButton = document.getElementById("high-button-home");
let taskPriority;


function setPriorityButtonSelected(button, priority) {
  const buttons = [lowButton, mediumButton, highButton];
  buttons.forEach(btn => btn.classList.remove("selected"));
  button.classList.add("selected");
  taskPriority = priority;
}
function removeSelectedPriorityButton() {
  const buttons = [lowButton, mediumButton, highButton];
  buttons.forEach(btn => btn.classList.remove("selected"));
}



// Event listeners para os botões priority
lowButton.addEventListener("click", () => setPriorityButtonSelected(lowButton, 100));
mediumButton.addEventListener("click", () => setPriorityButtonSelected(mediumButton, 200));
highButton.addEventListener("click", () => setPriorityButtonSelected(highButton, 300));

function getDragAfterElement(panel, y) {
    const draggableElements = [...panel.querySelectorAll('.task:not(.dragging)')] // Dentro da lista de painéis, seleciona todos os elementos com a classe task que nao tenham a classe dragging  
    return draggableElements.reduce((closest, child) => { // Retorna o elemento mais próximo do que esáa a ser arrastado e que está a ser comparado
        const box = child.getBoundingClientRect() // Retorna o tamanho do elemento e a sua posição relativamente ao viewport
        const offset = y - box.top - box.height / 2 // Calcula a distância entre o elemento que está a ser arrastado e o que está a ser comparado
        if (offset < 0 && offset > closest.offset) { // Se a distância for menor que 0 e maior que a distância do elemento mais próximo até agora
            return { offset: offset, element: child }
        } else { //
            return closest // Retorna o elemento mais próximo até agora
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element} 

  // Event listener do botão add task para criar uma nova task e colocá-la no painel To Do (default para qualquer task criada)
document.getElementById('addTask').addEventListener('click', function() {
  var Description = taskDescription.value.trim();
  var Name = taskName.value.trim();
  var priority = taskPriority;
  var startdate = document.getElementById('startdate').value;
  var enddate = document.getElementById('enddate').value;
  if (Name === '' || Description === '' || priority === null || startdate === '') {
    document.getElementById('warningMessage2').innerText = 'Fill in all fields and define a priority';
  }else if(enddate !== ''){
    if (startdate > enddate) {
    document.getElementById('warningMessage2').innerText = 'Start date must be before end date';
    }
  } else {
    document.getElementById('warningMessage2').innerText = '';
  }
  if (Name.trim() !== '' && Description.trim() !== '' && priority !== null && startdate !== ''){
    if(enddate === ''){
      enddate = '2199-12-31';
    }
    console.log('startdate',startdate);
    console.log('enddate',enddate);
      const task = createTask(Name, Description, priority,startdate,enddate);
      postTask(task);
      // Limpar os input fields depois de adicionar a task
      document.getElementById('taskName').value = '';
      document.getElementById('taskDescription').value = '';
      document.getElementById('startdate').value = '';
      document.getElementById('enddate').value = '';
      removeSelectedPriorityButton();
      taskPriority = null;
  }
});

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
  }).then(async function(response){
    if (response.status === 201){
      const taskData= await response.json();
      task = {
        id: taskData.id,
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        startDate: taskData.startDate,
        endDate: taskData.endDate,
        status: taskData.status
      }
      const taskElement = createTaskElement(task);
      if (task.status === 10) {
        document.getElementById('todo').appendChild(taskElement);
      } else if (task.status === 20) {
        document.getElementById('doing').appendChild(taskElement);
      }else if (task.status === 30) {
        document.getElementById('done').appendChild(taskElement);
      }
      attachDragAndDropListeners(taskElement);
    }else if (response.status === 404){
      alert('User not found');
    }
  });
}

function createTaskElement(task) {
  console.log(task);
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
      deletebtn.removeEventListener('click', () => {
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
 // Elemento html onde vai ser mostrada a hora
const displayTime = document.querySelector(".display-time");
function showTime() {
  let time = new Date();
  let timeString = time.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' });
  displayTime.innerText = timeString;
  setTimeout(showTime, 1000);
}
// Data
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

document.getElementById('login-home').addEventListener('click', () => {
  window.location.href = 'profileEdition.html';
});

document.getElementById('logout').addEventListener('click', () => {
  logout();
});

window.onclose = function () { // Guarda as tarefas na local storage quando a página é fechada
  sessionStorage.clear();
  localStorage.clear();
}


//fazer fetch ao ficheiro do backend
async function getUserPhoto(){
  try {
    const response = await fetch(`http://localhost:8080/lexsilva-pedromont-proj2/rest/user/${sessionStorage.getItem('username')}`);
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    
    const obj = await response.json();
    console.log(obj);
    console.log(obj.userPhoto);
    sessionStorage.setItem('photo', obj.userPhoto);
    return obj.userPhoto;
    
  } catch (error) {
    console.error('Something went wrong:', error);
    // Re-throw the error or return a rejected promise
    throw error;
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
async function logout() {
  await fetch('http://localhost:8080/lexsilva-pedromont-proj2/rest/user/logout', {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password'),
    }
  }).then(function(response) {
    if (response.status === 200) {
      // User is logged in successfully
      alert('User is logged out successfully :)');  
     const tasks = document.querySelectorAll('.task');
     if (tasks.length > 0) {
        tasks.forEach(task => {
          updateTask(task);
        });
      }
      sessionStorage.clear();
      window.location.href = 'index.html';
    } else if (response.status === 405) {
      sessionStorage.clear();
      window.location.href = 'index.html';
      // User not found
      alert('Unauthorized User');
    } else {
      // Something went wrong
      alert('Something went wrong :(');
      sessionStorage.clear();
      window.location.href = 'index.html';
    }
  });
  sessionStorage.clear();
  window.location.href = 'index.html';
}
