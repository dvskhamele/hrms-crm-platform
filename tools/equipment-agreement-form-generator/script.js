
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-agreement-btn');
    const agreementOutput = document.getElementById('agreement-output');
    const agreementContent = document.getElementById('agreement-content');
    const copyBtn = document.getElementById('copy-agreement-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const equipmentList = document.getElementById('equipment-list').value.split('\n').filter(line => line.trim() !== '');
        const agreementDate = document.getElementById('agreement-date').value || new Date().toLocaleDateString();

        let equipmentHtml = equipmentList.length > 0 ? `<ul>${equipmentList.map(item => `<li>${item.trim()}</li>`).join('')}</ul>` : '<p>[List of equipment issued]</p>';

        agreementContent.innerHTML = `
            <h2>Equipment Agreement - ${companyName}</h2>
            <p><strong>Date:</strong> ${agreementDate}</p>

            <h3>1. Parties Involved</h3>
            <p>This Equipment Agreement ("Agreement") is made between <strong>${companyName}</strong> (hereinafter "Company") and <strong>${employeeName}</strong> (hereinafter "Employee").</p>

            <h3>2. Purpose</h3>
            <p>This Agreement outlines the terms and conditions for the use of Company-owned equipment issued to the Employee for the purpose of performing their job duties.</p>

            <h3>3. Equipment Issued</h3>
            <p>The Company hereby issues the following equipment to the Employee:</p>
            ${equipmentHtml}

            <h3>4. Employee Responsibilities</h3>
            <ul>
                <li>The Employee agrees to use the equipment solely for Company business.</li>
                <li>The Employee is responsible for the proper care, maintenance, and security of the equipment.</li>
                <li>The Employee must report any loss, theft, damage, or malfunction of the equipment to their manager immediately.</li>
                <li>The Employee agrees not to install unauthorized software or make unauthorized modifications to the equipment.</li>
            </ul>

            <h3>5. Return of Equipment</h3>
            <p>Upon termination of employment, or at any time upon request by the Company, the Employee agrees to immediately return all Company-issued equipment in good working condition, reasonable wear and tear excepted.</p>

            <h3>6. Acknowledgment</h3>
            <p>The Employee acknowledges receipt of the above-listed equipment and understands their responsibilities as outlined in this Agreement.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>Company Representative Signature & Date</p>
        `;

        agreementOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(agreementContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Document';
        }, 2000);
    });
});
