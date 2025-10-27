
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formCode = document.getElementById('generated-form-code');
    const copyBtn = document.getElementById('copy-code-btn');

    const formHTML = `
<form action="#" method="POST">
    <h2>Time-Off Request</h2>
    
    <div style="margin-bottom: 15px;">
        <label for="employee-name" style="display: block; margin-bottom: 5px;">Employee Name:</label>
        <input type="text" id="employee-name" name="employee-name" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    
    <div style="margin-bottom: 15px;">
        <label for="start-date" style="display: block; margin-bottom: 5px;">Start Date:</label>
        <input type="date" id="start-date" name="start-date" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    
    <div style="margin-bottom: 15px;">
        <label for="end-date" style="display: block; margin-bottom: 5px;">End Date:</label>
        <input type="date" id="end-date" name="end-date" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
    </div>
    
    <div style="margin-bottom: 15px;">
        <label for="request-type" style="display: block; margin-bottom: 5px;">Type of Leave:</label>
        <select id="request-type" name="request-type" required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
            <option value="vacation">Vacation</option>
            <option value="sick-leave">Sick Leave</option>
            <option value="personal-day">Personal Day</option>
            <option value="other">Other</option>
        </select>
    </div>
    
    <div style="margin-bottom: 15px;">
        <label for="comments" style="display: block; margin-bottom: 5px;">Comments (Optional):</label>
        <textarea id="comments" name="comments" rows="4" style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;"></textarea>
    </div>
    
    <div>
        <button type="submit" style="background-color: #007bff; color: #fff; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer;">Submit Request</button>
    </div>
</form>
`;

    generateBtn.addEventListener('click', () => {
        formCode.value = formHTML.trim();
        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        formCode.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Code';
        }, 2000);
    });
});
