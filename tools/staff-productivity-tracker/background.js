// background.js - Background script for the hotel staff productivity tracker

// Initialize the extension
chrome.runtime.onInstalled.addListener(() => {
  console.log('Hotel Staff Productivity Tracker installed');
  
  // Create initial data structure if not exists
  chrome.storage.local.get(['tasks'], function(result) {
    if (!result.tasks) {
      chrome.storage.local.set({ tasks: [] });
    }
  });
  
  // Set up daily reminder notification
  chrome.alarms.create('dailyReminder', {
    delayInMinutes: 1, // First reminder after 1 minute for testing
    periodInMinutes: 60 // Then every hour
  });
});

// Handle alarm events
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'dailyReminder') {
    // Check if user has tasks that need attention
    chrome.storage.local.get(['tasks'], function(result) {
      if (result.tasks && result.tasks.length > 0) {
        const incompleteTasks = result.tasks.filter(task => !task.completed);
        
        if (incompleteTasks.length > 0) {
          // Create notification
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon48.png',
            title: 'Hotel Staff Productivity Tracker',
            message: `You have ${incompleteTasks.length} incomplete tasks. Check your extension to manage them!`,
            priority: 1
          });
        }
      }
    });
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'getStats') {
    chrome.storage.local.get(['tasks'], function(result) {
      if (result.tasks) {
        const total = result.tasks.length;
        const completed = result.tasks.filter(task => task.completed).length;
        const productivity = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        sendResponse({
          totalTasks: total,
          completedTasks: completed,
          productivityRate: productivity
        });
      } else {
        sendResponse({
          totalTasks: 0,
          completedTasks: 0,
          productivityRate: 0
        });
      }
    });
    return true; // Keep message channel open for async response
  }
});