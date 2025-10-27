document.addEventListener('DOMContentLoaded', () => {
    const taskInputsDiv = document.getElementById('taskInputs');
    const addTaskItemBtn = document.getElementById('addTaskItem');
    const generateBtn = document.getElementById('generateBtn');
    const generatedChecklistDiv = document.getElementById('generatedChecklist');
    const leadEmailInput = document.getElementById('leadEmail');
    const subscribeBtn = document.getElementById('subscribeBtn');
    const leadMessage = document.getElementById('leadMessage');

    const saveInputs = () => {
        const currentTasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            currentTasks.push({
                description: item.querySelector('.task-description').value,
                dueDate: item.querySelector('.task-due-date').value,
                owner: item.querySelector('.task-owner').value
            });
        });
        localStorage.setItem('onboardingTasks', JSON.stringify(currentTasks));
    };

    const loadInputs = () => {
        const savedTasks = JSON.parse(localStorage.getItem('onboardingTasks'));
        if (savedTasks && savedTasks.length > 0) {
            taskInputsDiv.innerHTML = ''; // Clear default items
            savedTasks.forEach(task => addTaskItem(task.description, task.dueDate, task.owner));
        } else {
            // Add default items if nothing saved
            addTaskItem('Complete HR paperwork', 1, 'HR');
            addTaskItem('Setup workstation and accounts', 1, 'IT');
            addTaskItem('Meet with manager for 1:1', 3, 'Manager');
        }
    };

    const addTaskItem = (description = '', dueDate = 1, owner = '') => {
        const taskItemDiv = document.createElement('div');
        taskItemDiv.classList.add('form-group', 'task-item');
        taskItemDiv.innerHTML = `
            <label>Task Description:</label>
            <input type="text" class="task-description" value="${description}">
            <label>Due Date (days from start):</label>
            <input type="number" class="task-due-date" min="0" value="${dueDate}">
            <label>Owner:</label>
            <input type="text" class="task-owner" value="${owner}">
            <button class="remove-task-item">Remove</button>
        `;
        taskInputsDiv.appendChild(taskItemDiv);
        taskItemDiv.querySelector('.remove-task-item').addEventListener('click', () => {
            taskItemDiv.remove();
            saveInputs();
            generateChecklist();
        });
        taskItemDiv.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => {
                saveInputs();
                generateChecklist();
            });
        });
    };

    addTaskItemBtn.addEventListener('click', () => {
        addTaskItem();
        saveInputs();
        generateChecklist();
    });

    const generateChecklist = () => {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            const description = item.querySelector('.task-description').value;
            const dueDate = item.querySelector('.task-due-date').value;
            const owner = item.querySelector('.task-owner').value;
            if (description) {
                tasks.push({ description, dueDate, owner });
            }
        });

        if (tasks.length === 0) {
            generatedChecklistDiv.innerHTML = '<p>No tasks to display. Add some tasks above!</p>';
            console.warn('Analytics Event: Checklist generated with no tasks');
            return;
        }

        let checklistHtml = '<ul>';
        tasks.forEach(task => {
            checklistHtml += `<li>${task.description} (Due: Day ${task.dueDate}, Owner: ${task.owner})</li>`;
        });
        checklistHtml += '</ul>';
        generatedChecklistDiv.innerHTML = checklistHtml;

        saveInputs();
        console.log(`Analytics Event: Onboarding checklist generated with ${tasks.length} tasks`);
    };

    generateBtn.addEventListener('click', generateChecklist);

    loadInputs();
    generateChecklist(); // Initial generation on page load

    subscribeBtn.addEventListener('click', async () => {
        const email = leadEmailInput.value;
        if (!email || !email.includes('@')) {
            leadMessage.textContent = 'Please enter a valid email address.';
            leadMessage.style.color = 'red';
            console.warn('Analytics Event: Invalid email for lead capture');
            return;
        }

        // Simulate saving lead to a JSON file
        console.log(`Analytics Event: Lead captured - ${email}`);
        leadMessage.textContent = 'Thank you for subscribing!';
        leadMessage.style.color = 'green';
        leadEmailInput.value = ''; // Clear the input

        try {
            const response = await fetch('/data/tools/new-hire-onboarding-checklist-generator-leads.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, timestamp: new Date().toISOString() }),
            });
            console.log('Simulated lead save attempt initiated.');
        } catch (error) {
            console.error('Simulated lead save failed (expected without backend):', error);
        }
    });
});