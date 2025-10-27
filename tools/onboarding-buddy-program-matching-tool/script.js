document.getElementById('match-btn').addEventListener('click', () => {
    const newHireName = document.getElementById('new-hire-name').value;
    const buddyName = document.getElementById('buddy-name').value;

    if (!newHireName || !buddyName) {
        document.getElementById('match-results').innerHTML = '<p style="color: red;">Please enter both names.</p>';
        return;
    }

    const matchMessage = `
        <h2>Match Successful!</h2>
        <p><strong>New Hire:</strong> ${newHireName}</p>
        <p><strong>Onboarding Buddy:</strong> ${buddyName}</p>
    `;

    document.getElementById('match-results').innerHTML = matchMessage;
});
