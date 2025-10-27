document.addEventListener('DOMContentLoaded', () => {
    const estimateBtn = document.getElementById('estimate-btn');
    const budgetOutput = document.getElementById('budget-output');
    const budgetContent = document.getElementById('budget-content');
    const copyBtn = document.getElementById('copy-budget-btn');

    estimateBtn.addEventListener('click', () => {
        const numEmployees = parseFloat(document.getElementById('num-employees').value);
        const avgSalary = parseFloat(document.getElementById('avg-salary').value);

        if (isNaN(numEmployees) || numEmployees <= 0 || isNaN(avgSalary) || avgSalary <= 0) {
            alert('Please enter valid numbers for employees and average salary.');
            return;
        }

        const totalSalaries = numEmployees * avgSalary;

        // --- Budget Category Percentages (Estimates) ---
        // These are rough industry averages and can vary widely.
        const percentages = {
            salaries: 1.0, // Base salaries are 100% of this category
            benefits: 0.25, // 25% of total salaries for benefits
            recruitment: 0.10, // 10% of avg salary per new hire (assuming some turnover/growth)
            training: 0.03, // 3% of total salaries for training
            hrSoftware: 0.01, // 1% of total salaries for HR software
            engagement: 0.005, // 0.5% of total salaries for engagement
            legal: 0.002 // 0.2% of total salaries for legal/compliance
        };

        const budget = {
            salaries: totalSalaries,
            benefits: totalSalaries * percentages.benefits,
            recruitment: numEmployees * avgSalary * percentages.recruitment, // Simplified: assumes some hiring activity
            training: totalSalaries * percentages.training,
            hrSoftware: totalSalaries * percentages.hrSoftware,
            engagement: totalSalaries * percentages.engagement,
            legal: totalSalaries * percentages.legal
        };

        const totalBudget = Object.values(budget).reduce((sum, val) => sum + val, 0);

        budgetContent.innerHTML = `
            <p><strong>Total Estimated Salaries:</strong> <span>$${budget.salaries.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated Benefits:</strong> <span>$${budget.benefits.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated Recruitment Costs:</strong> <span>$${budget.recruitment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated Training & Development:</strong> <span>$${budget.training.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated HR Software & Tech:</strong> <span>$${budget.hrSoftware.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated Employee Engagement:</strong> <span>$${budget.engagement.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <p><strong>Estimated Compliance & Legal:</strong> <span>$${budget.legal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
            <hr>
            <p><strong>Total Estimated Annual HR Budget:</strong> <span>$${totalBudget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
        `;

        budgetOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        let textToCopy = 'Estimated Annual HR Budget\n\n';
        const budgetItems = budgetContent.querySelectorAll('p');
        budgetItems.forEach(item => {
            textToCopy += item.textContent + '\n';
        });

        navigator.clipboard.writeText(textToCopy.trim()).then(() => {
            copyBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.textContent = 'Copy Budget Details';
            }, 2000);
        });
    });
});
