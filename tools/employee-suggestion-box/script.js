document.addEventListener('DOMContentLoaded', () => {
    const suggestionForm = document.getElementById('suggestion-form');
    const suggestionText = document.getElementById('suggestion-text');
    const thankYouMessage = document.getElementById('thank-you-message');

    suggestionForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        if (suggestionText.value.trim() === '') {
            alert('Please enter your suggestion before submitting.');
            return;
        }

        // In a real application, you would send this data to a backend server.
        // For this standalone tool, we'll just simulate submission.

        suggestionForm.style.display = 'none';
        thankYouMessage.style.display = 'block';

        // Optionally, clear the form after a delay or allow new submission
        // setTimeout(() => {
        //     suggestionForm.reset();
        //     suggestionForm.style.display = 'block';
        //     thankYouMessage.style.display = 'none';
        // }, 5000);
    });
});
