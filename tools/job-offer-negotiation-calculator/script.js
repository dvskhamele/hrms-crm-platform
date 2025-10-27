const salary1Input = document.getElementById('salary1');
const bonus1Input = document.getElementById('bonus1');
const equity1Input = document.getElementById('equity1');
const benefits1Input = document.getElementById('benefits1');
const pto1Input = document.getElementById('pto1');

const salary2Input = document.getElementById('salary2');
const bonus2Input = document.getElementById('bonus2');
const equity2Input = document.getElementById('equity2');
const benefits2Input = document.getElementById('benefits2');
const pto2Input = document.getElementById('pto2');

const compareBtn = document.getElementById('compare-btn');
const totalValue1Span = document.getElementById('total-value1');
const totalValue2Span = document.getElementById('total-value2');
const recommendationP = document.getElementById('recommendation');

function calculateTotalValue(salary, bonus, equity, benefits, pto) {
    // For simplicity, PTO is valued at a standard daily rate, e.g., $200/day
    const ptoValue = pto * 200;
    return salary + bonus + equity + benefits + ptoValue;
}

compareBtn.addEventListener('click', () => {
    const salary1 = parseFloat(salary1Input.value) || 0;
    const bonus1 = parseFloat(bonus1Input.value) || 0;
    const equity1 = parseFloat(equity1Input.value) || 0;
    const benefits1 = parseFloat(benefits1Input.value) || 0;
    const pto1 = parseFloat(pto1Input.value) || 0;

    const salary2 = parseFloat(salary2Input.value) || 0;
    const bonus2 = parseFloat(bonus2Input.value) || 0;
    const equity2 = parseFloat(equity2Input.value) || 0;
    const benefits2 = parseFloat(benefits2Input.value) || 0;
    const pto2 = parseFloat(pto2Input.value) || 0;

    const totalValue1 = calculateTotalValue(salary1, bonus1, equity1, benefits1, pto1);
    const totalValue2 = calculateTotalValue(salary2, bonus2, equity2, benefits2, pto2);

    totalValue1Span.textContent = `$${totalValue1.toLocaleString()}`;
    totalValue2Span.textContent = `$${totalValue2.toLocaleString()}`;

    if (totalValue1 > totalValue2) {
        recommendationP.textContent = "Offer 1 appears to have a higher total value.";
        recommendationP.style.color = "#28a745";
    } else if (totalValue2 > totalValue1) {
        recommendationP.textContent = "Offer 2 appears to have a higher total value.";
        recommendationP.style.color = "#28a745";
    } else {
        recommendationP.textContent = "The total values of both offers are similar.";
        recommendationP.style.color = "#007bff";
    }
});
