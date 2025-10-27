
document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task');
    const tasksContainer = document.getElementById('tasks-container');
    const generateChecklistBtn = document.getElementById('generate-checklist');
    const checklistOutputDiv = document.getElementById('checklist-output');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    let taskCount = 0;

    const addTask = () => {
        taskCount++;
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('form-group');
        taskDiv.innerHTML = `
            <label for="task-${taskCount}">Task ${taskCount}</label>
            <input type="text" id="task-${taskCount}" placeholder="e.g., Complete HR paperwork">
        `;
        tasksContainer.appendChild(taskDiv);
    };

    const generateChecklist = () => {
        const employeeName = document.getElementById('employee-name').value;
        const startDate = document.getElementById('start-date').value;
        const department = document.getElementById('department').value;

        if (!employeeName || !startDate || !department) {
            alert('Please fill in Employee Name, Start Date, and Department.');
            return;
        }

        let checklistHtml = `
            <h2>Onboarding Checklist for ${employeeName}</h2>
            <p><strong>Start Date:</strong> ${startDate}</p>
            <p><strong>Department:</strong> ${department}</p>
            <ul>
        `;

        for (let i = 1; i <= taskCount; i++) {
            const task = document.getElementById(`task-${i}`).value;
            if (task) {
                checklistHtml += `
                    <li><input type="checkbox"> ${task}</li>
                `;
            }
        }

        checklistHtml += `
            </ul>
        `;

        checklistOutputDiv.innerHTML = checklistHtml;
        checklistOutputDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('onboarding_checklist_generated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Employee Onboarding Checklist Generator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your checklist has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    addTaskBtn.addEventListener('click', addTask);
    generateChecklistBtn.addEventListener('click', generateChecklist);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);

    // Add a few default tasks
    addTask();
    addTask();
    addTask();
});
