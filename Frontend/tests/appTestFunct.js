//funcoes homescript.js
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
function showTime() {
    let time = new Date();
    let timeString = time.toLocaleTimeString("en-US", { hour12: false, hour: '2-digit', minute: '2-digit' });
    displayTime.innerText = timeString;
    setTimeout(showTime, 1000);
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
//funcoes task.js
function setStatusButtonSelected(button, status) {
    const buttons = [todoButton, doingButton, doneButton];
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    sessionStorage.setItem("taskStatus", status);
}

// Função para definir o estado no grupo de botões priority
function setPriorityButtonSelected(button, priority) {
    const buttons = [lowButton, mediumButton, highButton];
    buttons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    sessionStorage.setItem("taskPriority", priority);
}
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
