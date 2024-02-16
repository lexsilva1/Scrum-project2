// Import the function to be tested
const createTaskElement = require('./createTaskElement');

//teste 1
describe('createTaskElement', () => {
  test('creates a task element with correct properties', () => {
    // Create a mock task object
    const task = {
      id: 'task1',
      priority: 200, // Assuming medium priority
      status: 10, // Assuming "todo" status
      description: 'Task description',
      title: 'Task Title',
      startDate: '2024-02-16',
      endDate: '2024-02-18'
    };
    const taskElement = createTaskElement(task); //chama a  função para criar o elemento task

    //verifica se a task cria corretamente com os elementos providenciados 
    expect(taskElement.id).toBe('task1');
    expect(taskElement.classList.contains('task')).toBe(true);
    expect(taskElement.classList.contains('medium')).toBe(true);
    expect(taskElement.draggable).toBe(true);
    expect(taskElement.description).toBe('Task description');
    expect(taskElement.title).toBe('Task Title');
    expect(taskElement.status).toBe('todo'); 
    expect(taskElement.startdate).toBe('2024-02-16');
    expect(taskElement.enddate).toBe('2024-02-18');

    //verificar se o task contem os elementos filhos esperados 
    const postIt = taskElement.querySelector('.post-it');
    expect(postIt).toBeTruthy();
    const taskTitle = postIt.querySelector('h3');
    expect(taskTitle.textContent).toBe('Task Title');
    const descriptionContainer = postIt.querySelector('.post-it-text');
    expect(descriptionContainer).toBeTruthy();
    const displayDescription = descriptionContainer.querySelector('p');
    expect(displayDescription.textContent).toBe('Task description');
    const deleteButton = postIt.querySelector('img.apagarButton');
    expect(deleteButton).toBeTruthy();
  });
  //teste2 
  test('verifies if a low priority is not interpreted as medium', () => {
    // Create a mock task object
    const task = {
      id: 'task1',
      priority: 100, // Assuming medium priority
      status: 10, // Assuming "todo" status
      description: 'Task description',
      title: 'Task Title',
      startDate: '2024-02-16',
      endDate: '2024-02-18'
    };
    const taskElement = createTaskElement(task); //chama a  função para criar o elemento task

    //verifica se a task cria corretamente com os elementos providenciados 
    expect(taskElement.id).toBe('task1');
    expect(taskElement.classList.contains('task')).toBe(true);
    expect(taskElement.classList.contains('medium')).toBe(false);
    expect(taskElement.draggable).toBe(true);
    expect(taskElement.description).toBe('Task description');
    expect(taskElement.title).toBe('Task Title');
    expect(taskElement.status).toBe('todo'); 
    expect(taskElement.startdate).toBe('2024-02-16');
    expect(taskElement.enddate).toBe('2024-02-18');

    //verificar se o task contem os elementos filhos esperados 
    const postIt = taskElement.querySelector('.post-it');
    expect(postIt).toBeTruthy();
    const taskTitle = postIt.querySelector('h3');
    expect(taskTitle.textContent).toBe('Task Title');
    const descriptionContainer = postIt.querySelector('.post-it-text');
    expect(descriptionContainer).toBeTruthy();
    const displayDescription = descriptionContainer.querySelector('p');
    expect(displayDescription.textContent).toBe('Task description');
    const deleteButton = postIt.querySelector('img.apagarButton');
    expect(deleteButton).toBeTruthy();
  });
  //teste3
  test('verify if end date is null', () => {
    // Cria um objecto mock(falso/a fingir) para simular o comportamento do objeto na aplicação
    const task = {
      id: 'task1',
      priority: 200, 
      status: 20, 
      description: 'Task description',
      title: 'Task Title',
      startDate: '2024-02-16',
      endDate:null, 
    };
    const taskElement = createTaskElement(task); //chama a  função para criar o elemento task

    //verifica se a task cria corretamente com os elementos providenciados 
    expect(taskElement.id).toBe('task1');
    expect(taskElement.classList.contains('task')).toBe(true);
    expect(taskElement.classList.contains('medium')).toBe(true);
    expect(taskElement.draggable).toBe(true);
    expect(taskElement.description).toBe('Task description');
    expect(taskElement.title).toBe('Task Title');
    expect(taskElement.status).toBe('doing'); 
    expect(taskElement.startdate).toBe('2024-02-16');
    expect(taskElement.enddate).toBe(null);

    //verificar se o task contem os elementos filhos esperados 
    const postIt = taskElement.querySelector('.post-it');
    expect(postIt).toBeTruthy();
    const taskTitle = postIt.querySelector('h3');
    expect(taskTitle.textContent).toBe('Task Title');
    const descriptionContainer = postIt.querySelector('.post-it-text');
    expect(descriptionContainer).toBeTruthy();
    const displayDescription = descriptionContainer.querySelector('p');
    expect(displayDescription.textContent).toBe('Task description');
    const deleteButton = postIt.querySelector('img.apagarButton');
    expect(deleteButton).toBeTruthy();
  });
  //teste4
  test('contains high not to be true', () => {
    // Create a mock task object
    const task = {
      id: 'task1',
      priority: 200, 
      status: 10, 
      description: 'Task description',
      title: 'Task Title',
      startDate: '2024-02-16',
      endDate: '2024-02-18'
    };
    const taskElement = createTaskElement(task); //chama a  função para criar o elemento task

    //verifica se a task cria corretamente com os elementos providenciados 
    expect(taskElement.id).toBe('task1');
    expect(taskElement.classList.contains('task')).toBe(true);
    expect(taskElement.classList.contains('medium')).toBe(true);
    expect(taskElement.draggable).toBe(true);
    expect(taskElement.description).toBe('Task description');
    expect(taskElement.title).toBe('Task Title');
    expect(taskElement.status).toBe('todo'); 
    expect(taskElement.startdate).toBe('2024-02-16');
    expect(taskElement.enddate).toBe('2024-02-18');

    expect(taskElement.classList.contains('high')).not.toBe(true);

    //verificar se o task contem os elementos filhos esperados 
    const postIt = taskElement.querySelector('.post-it');
    expect(postIt).toBeTruthy();
    const taskTitle = postIt.querySelector('h3');
    expect(taskTitle.textContent).toBe('Task Title');
    const descriptionContainer = postIt.querySelector('.post-it-text');
    expect(descriptionContainer).toBeTruthy();
    const displayDescription = descriptionContainer.querySelector('p');
    expect(displayDescription.textContent).toBe('Task description');
    const deleteButton = postIt.querySelector('img.apagarButton');
    expect(deleteButton).toBeTruthy();
  });
  //teste5
  //teste6
  //teste7
  //teste8
  //teste9
  //teste10
});
