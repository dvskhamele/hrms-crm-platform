document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedStatement = document.getElementById('generated-statement');

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value.trim();
        const baseSalary = parseFloat(document.getElementById('base-salary').value);
        const bonus = parseFloat(document.getElementById('bonus').value || 0);
        const healthInsurance = parseFloat(document.getElementById('health-insurance').value || 0);
        const retirementContribution = parseFloat(document.getElementById('retirement-contribution').value || 0);
        const ptoValue = parseFloat(document.getElementById('pto-value').value || 0);
        const otherBenefits = parseFloat(document.getElementById('other-benefits').value || 0);

        if (!employeeName || isNaN(baseSalary)) {
            alert('Please enter the Employee Name and Annual Base Salary.');
            return;
        }

        const totalCompensation = baseSalary + bonus + healthInsurance + retirementContribution + ptoValue + otherBenefits;

        const statement = `Total Compensation Statement for ${employeeName}\n\n` +
                          `----------------------------------------------------\n` +
                          `1. Direct Compensation:\n` +
                          `   - Annual Base Salary: £${baseSalary.toFixed(2)}\n` +
                          `   - Annual Bonus/Commission: £${bonus.toFixed(2)}\n` +
                          `\n` +
                          `2. Benefits & Indirect Compensation:\n` +
                          `   - Employer Health Insurance Contribution: £${healthInsurance.toFixed(2)}\n` +
                          `   - Employer Retirement Contribution: £${retirementContribution.toFixed(2)}\n` +
                          `   - Estimated PTO Value: £${ptoValue.toFixed(2)}\n` +
                          `   - Other Benefits Value: £${otherBenefits.toFixed(2)}\n` +
                          `\n` +
                          `----------------------------------------------------\n` +
                          `Total Estimated Compensation: £${totalCompensation.toFixed(2)}\n` +
                          `----------------------------------------------------\n\n` +
                          `This statement provides an estimate of the total value of your compensation package at [Company Name] for the current year. It includes your direct compensation (salary, bonus) and the estimated value of various benefits and indirect compensation. Please note that some values are estimates and may vary. For exact details on your benefits, please refer to your benefits enrollment documents or contact HR.`;

        generatedStatement.value = statement;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedStatement.value) {
            navigator.clipboard.writeText(generatedStatement.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
