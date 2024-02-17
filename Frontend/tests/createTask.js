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
  module.exports = createTask;