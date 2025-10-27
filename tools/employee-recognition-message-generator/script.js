document.getElementById('generate-btn').addEventListener('click', () => {
    const employeeName = document.getElementById('employee-name').value;
    const achievement = document.getElementById('achievement').value;
    const impact = document.getElementById('impact').value;
    const tone = document.getElementById('tone').value;
    const messageDiv = document.getElementById('message');

    if (!employeeName || !achievement || !impact || !tone) {
        messageDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    let generatedMessage = '';

    if (tone === 'formal') {
        generatedMessage = `
            <p>Dear ${employeeName},</p>
            <p>We would like to formally recognize your outstanding contribution in ${achievement}. Your dedication and effort have resulted in ${impact}, which is highly valued by the organization.</p>
            <p>Thank you for your commitment to excellence.</p>
            <p>Sincerely,</p>
            <p>[Manager/Leadership Name]</p>
            <p>[Company Name]</p>
        `;
    } else if (tone === 'informal') {
        generatedMessage = `
            <p>Hi ${employeeName},</p>
            <p>Just wanted to give a huge shout-out for your amazing work on ${achievement}! The ${impact} you delivered really made a difference.</p>
            <p>Keep up the great work!</p>
            <p>Best,</p>
            <p>[Manager/Colleague Name]</p>
        `;
    } else if (tone === 'enthusiastic') {
        generatedMessage = `
            <p>Fantastic work, ${employeeName}!</p>
            <p>We are absolutely thrilled with your incredible achievement in ${achievement}! The ${impact} is truly outstanding and has made a massive positive impact!</p>
            <p>Thank you for your passion and dedication!</p>
            <p>Cheers,</p>
            <p>[Manager/Leadership Name]</p>
            <p>[Company Name]</p>
        `;
    }

    messageDiv.innerHTML = generatedMessage;
});