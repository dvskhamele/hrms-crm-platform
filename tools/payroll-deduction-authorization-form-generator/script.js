document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const employeeId = document.getElementById('employee-id').value;
        const authorizationDate = document.getElementById('authorization-date').value || new Date().toLocaleDateString();
        const deductionDetails = document.getElementById('deduction-details').value.split('\n').filter(line => line.trim() !== '');

        let employeeIdSection = '';
        if (employeeId) {
            employeeIdSection = `<p><strong>Employee ID:</strong> ${employeeId}</p>`;
        }

        let deductionRows = '';
        deductionDetails.forEach(item => {
            const parts = item.split(',').map(p => p.trim());
            if (parts.length >= 3) {
                const type = parts[0];
                const amount = parts[1];
                const frequency = parts[2];
                deductionRows += `
                    <tr>
                        <td>${type}</td>
                        <td>${amount}</td>
                        <td>${frequency}</td>
                    </tr>
                `;
            }
        });

        formContent.innerHTML = "`
            <h2>Payroll Deduction Authorization Form - ${companyName}</h2>
            <p><strong>Authorization Date:</strong> ${authorizationDate}</p>

            <h3>Employee Information</h3>
            <p><strong>Employee Name:</strong> ${employeeName}</p>
            ${employeeIdSection}
            <br>
            <h3>Deduction Authorization</h3>
            <p>I, ${employeeName}, hereby authorize ${companyName} to deduct the following amounts from my wages as specified below:</p>
            <table>
                <thead>
                    <tr>
                        <th>Type of Deduction</th>
                        <th>Amount/Percentage</th>
                        <th>Frequency</th>
                    </tr>
                </thead>
                <tbody>
                    ${deductionRows}
                </tbody>
            </table>
            <br>
            <h3>Terms and Conditions</h3>
            <ul>
                <li>I understand that this authorization will remain in effect until I provide written notice to ${companyName} to revoke or modify it.</li>
                <li>I understand that it is my responsibility to ensure the accuracy of the deduction details provided.</li>
                <li>I acknowledge that certain deductions (e.g., for benefits) may be subject to specific enrollment periods or eligibility requirements.</li>
            </ul>
            <br>
            <h3>Acknowledgement</h3>
            <p>I have read, understood, and agree to the terms of this Payroll Deduction Authorization Form.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <p>_________________________<br>HR/Payroll Representative Signature & Date</p>
        `";

        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
        const headerInfo = formContent.querySelectorAll('h2, p');
        headerInfo.forEach(el => {
            textToCopy += el.textContent + '\n';
        });

        textToCopy += '\n**Deduction Authorization**\n';
        textToCopy += formContent.querySelector('h3:nth-of-type(2)').nextElementSibling.textContent + '\n';

        const table = formContent.querySelector('table');
        if (table) {
            const headers = table.querySelectorAll('th');
            headers.forEach(th => textToCopy += th.textContent + '\t');
            textToCopy += '\n';

            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach(cell => textToCopy += cell.textContent + '\t');
                textToCopy += '\n';
            });
        }

        textToCopy += '\n**Terms and Conditions**\n';
        const ul = formContent.querySelector('ul');
        if (ul) {
            ul.querySelectorAll('li').forEach(li => textToCopy += `- ${li.textContent}\n`);
        }

        textToCopy += '\n**Acknowledgement**\n';
        textToCopy += formContent.querySelector('h3:nth-of-type(3)').nextElementSibling.textContent + '\n';
        textToCopy += '_________________________\nEmployee Signature & Date\n';
        textToCopy += '_________________________\nHR/Payroll Representative Signature & Date\n';

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Form Text';
            }, 2000);
        });
    });
});
