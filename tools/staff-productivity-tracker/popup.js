document.addEventListener('DOMContentLoaded', function() {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const tasksList = document.getElementById('tasksList');
  const totalTasksEl = document.getElementById('totalTasks');
  const completedTasksEl = document.getElementById('completedTasks');
  const productivityRateEl = document.getElementById('productivityRate');
  
  let tasks = [];
  
  // Load tasks from storage
  chrome.storage.local.get(['tasks'], function(result) {
    if (result.tasks) {
      tasks = result.tasks;
      renderTasks();
      updateStats();
    }
  });
  
  // Add task button event
  addTaskBtn.addEventListener('click', addTask);
  
  // Add task on Enter key
  taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  
  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        timestamp: new Date().toISOString()
      };
      
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      updateStats();
      
      taskInput.value = '';
      taskInput.focus();
    }
  }
  
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
    updateStats();
  }
  
  function toggleComplete(id) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    saveTasks();
    renderTasks();
    updateStats();
  }
  
  function saveTasks() {
    chrome.storage.local.set({ tasks: tasks });
  }
  
  function renderTasks() {
    tasksList.innerHTML = '';
    
    if (tasks.length === 0) {
      tasksList.innerHTML = '<p style="text-align: center; color: #777;">No tasks yet. Add your first task!</p>';
      return;
    }
    
    tasks.forEach(task => {
      const taskElement = document.createElement('div');
      taskElement.className = 'task-item';
      
      taskElement.innerHTML = `
        <div class="task-content" style="${task.completed ? 'text-decoration: line-through; color: #777;' : ''}">
          ${task.text}
          <div style="font-size: 0.8em; color: #999; margin-top: 3px;">
            ${formatDate(task.timestamp)}
          </div>
        </div>
        <div class="task-actions">
          <button class="complete-btn" data-id="${task.id}">
            ${task.completed ? 'Undo' : 'Done'}
          </button>
          <button class="delete-btn" data-id="${task.id}">X</button>
        </div>
      `;
      
      tasksList.appendChild(taskElement);
    });
    
    // Add event listeners to the new buttons
    document.querySelectorAll('.complete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        toggleComplete(id);
      });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('data-id'));
        deleteTask(id);
      });
    });
  }
  
  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    productivityRateEl.textContent = productivity;
  }
  
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
});