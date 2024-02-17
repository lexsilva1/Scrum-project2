function handleAddTaskClick(){

    var Description = taskDescription.value.trim();
    var Name = taskName.value.trim();
    var priority = taskPriority;
    var startdate = document.getElementById('startdate').value;
    var enddate = document.getElementById('enddate').value;
    if (Name === '' || Description === '' || priority === null || startdate === '' || enddate === '') {
      document.getElementById('warningMessage2').innerText = 'Fill in all fields and define a priority';
    } else if (startdate > enddate) {
      document.getElementById('warningMessage2').innerText = 'Start date must be before end date';
    } else {
      document.getElementById('warningMessage2').innerText = '';
    }
    if (Name.trim() !== '' && Description.trim() !== '' && priority !== null && startdate !== '' && enddate !== '' && startdate <= enddate){
        const task = createTask(Name, Description, priority,startdate,enddate);
        console.log("start date"+startdate);console.log("enddate"+enddate);
        postTask(task);
        task.status = 10;
        const taskElement =createTaskElement(task);
        document.getElementById('todo').appendChild(taskElement);
        attachDragAndDropListeners(taskElement);// Adicionar os listeners drag and drop à task criada de forma dinâmica
        
        
        // Limpar os input fields depois de adicionar a task
        document.getElementById('taskName').value = '';
        document.getElementById('taskDescription').value = '';
        document.getElementById('startdate').value = '';
        document.getElementById('enddate').value = '';
        removeSelectedPriorityButton();
        taskPriority = null;
  
    }
}
    document.getElementById('addTask').addEventListener('click', handleAddTaskClick());
    
    module.exports = handleAddTaskClick;