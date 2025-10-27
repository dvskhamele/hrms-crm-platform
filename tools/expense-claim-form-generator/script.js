document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-form-btn');
    const formOutput = document.getElementById('form-output');
    const formContent = document.getElementById('form-content');
    const copyBtn = document.getElementById('copy-form-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const employeeName = document.getElementById('employee-name').value || '[Employee Name]';
        const department = document.getElementById('department').value || '[Department]';
        const claimDate = document.getElementById('claim-date').value || new Date().toLocaleDateString();
        const expenseItems = document.getElementById('expense-items').value.split('\n').filter(line => line.trim() !== '');

        let expenseRows = '';
        let totalAmount = 0;

        expenseItems.forEach(item => {
            const parts = item.split(',').map(p => p.trim());
            if (parts.length === 3) {
                const date = parts[0];
                const description = parts[1];
                const amount = parseFloat(parts[2]);
                if (!isNaN(amount)) {
                    expenseRows += `
                        <tr>
                            <td>${date}</td>
                            <td>${description}</td>
                            <td>$${amount.toFixed(2)}</td>
                        </tr>
                    `;
                    totalAmount += amount;
                }
            }
        });

        formContent.innerHTML = `
            <h2>Expense Claim Form - ${companyName}</h2>
            <p><strong>Employee Name:</strong> ${employeeName}</p>
            <p><strong>Department:</strong> ${department}</p>
            <p><strong>Claim Date:</strong> ${claimDate}</p>
            <br>
            <h3>Expense Details</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${expenseRows}
                    <tr class="total-row">
                        <td colspan="2"><strong>Total Claim Amount:</strong></td>
                        <td><strong>$${totalAmount.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <h3>Declaration</h3>
            <p>I certify that these expenses were incurred on behalf of ${companyName} and are in accordance with company policy.</p>
            <p>_________________________<br>Employee Signature & Date</p>
            <br>
            <h3>Approval</h3>
            <p>_________________________<br>Manager Signature & Date</p>
        `;

        formOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = '';
        const headerInfo = formContent.querySelectorAll('h2, p');
        headerInfo.forEach(el => {
            textToCopy += el.textContent + '\n';
        });

        textToCopy += '\n**Expense Details**\n';
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

        textToCopy += '\n**Declaration**\n';
        textToCopy += formContent.querySelector('h3:nth-of-type(2)').nextElementSibling.textContent + '\n';
        textToCopy += '_________________________
Employee Signature & Date
';

        textToCopy += '\n**Approval**\n';
        textToCopy += '_________________________
Manager Signature & Date
';

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Form Text';
            }, 2000);
        });
    });
});
