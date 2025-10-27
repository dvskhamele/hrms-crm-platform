document.addEventListener('DOMContentLoaded', () => {
    const printBtn = document.getElementById('print-plan-btn');

    printBtn.addEventListener('click', () => {
        window.print();
    });
});
