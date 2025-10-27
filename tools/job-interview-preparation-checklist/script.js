document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    const progressBar = document.querySelector('.progress-bar');
    const progressText = document.querySelector('.progress-text');
    const totalCheckboxes = checkboxes.length;

    function updateProgress() {
        const checkedCount = document.querySelectorAll('.checklist input[type="checkbox"]:checked').length;
        const percentage = totalCheckboxes > 0 ? (checkedCount / totalCheckboxes) * 100 : 0;
        
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${Math.round(percentage)}% Complete`;

        checkboxes.forEach(cb => {
            if (cb.checked) {
                cb.parentElement.classList.add('completed');
            } else {
                cb.parentElement.classList.remove('completed');
            }
        });
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });

    // Initial progress update on load
    updateProgress();
});
