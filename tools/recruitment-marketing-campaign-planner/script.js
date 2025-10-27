document.getElementById('generate-btn').addEventListener('click', () => {
    const campaignGoal = document.getElementById('campaign-goal').value;
    const targetAudience = document.getElementById('target-audience').value;
    const channelsInput = document.getElementById('channels').value;
    const keyMessagesInput = document.getElementById('key-messages').value;
    const timeline = document.getElementById('timeline').value;
    const campaignPlanDiv = document.getElementById('campaign-plan');

    if (!campaignGoal || !targetAudience || !channelsInput || !keyMessagesInput || !timeline) {
        campaignPlanDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    const channels = channelsInput.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    const keyMessages = keyMessagesInput.split(',').map(item => `<li>${item.trim()}</li>`).join('');

    const campaignPlanContent = `
        <h2>Recruitment Marketing Campaign Plan</h2>
        <p><strong>Campaign Goal:</strong> ${campaignGoal}</p>
        <p><strong>Target Audience:</strong> ${targetAudience}</p>
        <h3>Recommended Channels:</h3>
        <ul>
            ${channels}
        </ul>
        <h3>Key Messages:</h3>
        <ul>
            ${keyMessages}
        </ul>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p>This plan aims to attract qualified candidates by effectively reaching the target audience through selected channels with compelling messages.</p>
    `;

    campaignPlanDiv.innerHTML = campaignPlanContent;
});