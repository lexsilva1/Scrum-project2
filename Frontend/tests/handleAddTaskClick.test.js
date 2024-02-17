// Import the function to test
const handleAddTaskClick = require('./handleAddTaskClick');

// Mock document.getElementById and related functions
document.getElementById = jest.fn().mockReturnValue({
    addEventListener: jest.fn(),
    // Other properties or methods that the event target should have
});

describe('handleAddTaskClick', () => {
    test('adds a task when all fields are filled', () => {
        // Simulate a click event on the addTask button
        handleAddTaskClick();

        // Assert that the warningMessage2 text is empty
        expect(document.getElementById('warningMessage2').innerText).toBe('');

        // Assert that the taskName, taskDescription, startdate, and enddate elements have correct values
        expect(document.getElementById('taskName').value).toBe('Task Name');
        expect(document.getElementById('taskDescription').value).toBe('Task Description');
        expect(document.getElementById('startdate').value).toBe('2024-02-16');
        expect(document.getElementById('enddate').value).toBe('2024-02-16');

        // Assert that the todo element's appendChild function is called
        expect(document.getElementById('todo').appendChild).toHaveBeenCalled();
    });

    // Add more test cases to cover other scenarios as needed
});
