const createTask = require('./createTask');

describe('createTask', () => {
    test('creates a task with the given parameters', () => {
      // Arrange
      const name = 'Task 1';
      const description = 'Description of Task 1';
      const priority = 'high';
      const startDate = '2024-02-16';
      const endDate = '2024-02-18';
  
      // Act
      const task = createTask(name, description, priority, startDate, endDate);
  
      // Assert
      expect(task.title).toBe(name);
      expect(task.description).toBe(description);
      expect(task.priority).toBe(priority);
      expect(task.startDate).toBe(startDate);
      expect(task.endDate).toBe(endDate);
    });
    //test 2
    test('creates a task with default priority if not provided', () => {
        const name = 'Task 2';
        const description = 'Description of Task 2';
        const priority = null;
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(name, description,priority, startDate, endDate);
    
        expect(task.priority).toBe(null);
      });
    
      test('creates a task with default start and end dates if not provided', () => {
        const name = 'Task 3';
        const description = 'Description of Task 3';
        const priority = 'low';
        const startDate = null;
        const task = createTask(name, description, priority);
    
        // Assuming default dates are today and tomorrow
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
        expect(task.startDate).toBe(today);
        expect(task.endDate).toBe(tomorrow);
      });
      //test 3
      test('creates a task with empty name if not provided', () => {
        const description = 'Description of Task 4';
        const priority = 'high';
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(undefined, description, priority, startDate, endDate);
    
        expect(task.title).toBe('');
      });
      //test 4
      test('creates a task with empty description if not provided', () => {
        const name = 'Task 5';
        const priority = 'high';
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(name, undefined, priority, startDate, endDate);
    
        expect(task.description).toBe('');
      });
      //test 5
      test('creates a task with default priority if provided priority is invalid', () => {
        const name = 'Task 6';
        const description = 'Description of Task 6';
        const priority = 'invalidPriority';
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(name, description, priority, startDate, endDate);
    
        expect(task.priority).toBe('medium');
      });
    //test 6
      test('creates a task with default dates if provided dates are invalid', () => {
        const name = 'Task 7';
        const description = 'Description of Task 7';
        const priority = 'low';
        const startDate = 'invalidDate';
        const endDate = 'invalidDate';
    
        const task = createTask(name, description, priority, startDate, endDate);
    
        // Assuming default dates are today and tomorrow
        const today = new Date().toISOString().split('T')[0];
        const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
        expect(task.startDate).toBe(today);
        expect(task.endDate).toBe(tomorrow);
      });
    //test 7
      test('creates a task with trimmed title', () => {
        const name = '   Task 8    ';
        const description = 'Description of Task 8';
        const priority = 'low';
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(name, description, priority, startDate, endDate);
    
        expect(task.title).toBe('Task 8');
      });
    //test 8
      test('creates a task with trimmed description', () => {
        const name = 'Task 9';
        const description = '   Description of Task 9    ';
        const priority = 'high';
        const startDate = '2024-02-16';
        const endDate = '2024-02-18';
    
        const task = createTask(name, description, priority, startDate, endDate);
    
        expect(task.description).toBe('Description of Task 9');
      });
    //test 9
      test('creates a task with dates in ISO format', () => {
        const name = 'Task 10';
        const description = 'Description of Task 10';
        const priority = 'high';
        const startDate = new Date('2024-02-16');
        const endDate = new Date('2024-02-18');
    
        const task = createTask(name, description, priority, startDate, endDate);
    
        expect(task.startDate).toBe('2024-02-16');
        expect(task.endDate).toBe('2024-02-18');
      });
    });
