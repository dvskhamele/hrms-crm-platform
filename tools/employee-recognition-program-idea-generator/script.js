document.getElementById('generate-btn').addEventListener('click', () => {
    const recognitionGoal = document.getElementById('recognition-goal').value;
    const budget = document.getElementById('budget').value.toLowerCase();
    const frequency = document.getElementById('frequency').value;
    const ideasDiv = document.getElementById('ideas');

    if (!recognitionGoal || !budget || !frequency) {
        ideasDiv.innerHTML = '<p style="color: red;">Please fill out all fields.</p>';
        return;
    }

    let generatedIdeas = [];

    if (budget === 'low') {
        generatedIdeas.push(
            "Public shout-outs in team meetings or company newsletters.",
            "Handwritten thank-you notes from managers.",
            "Peer-to-peer recognition programs with small, symbolic rewards.",
            "Social media recognition (with employee consent)."
        );
    } else if (budget === 'medium') {
        generatedIdeas.push(
            "Gift cards to popular retailers or coffee shops.",
            "Team lunches or celebratory happy hours.",
            "Company-branded merchandise (e.g., t-shirts, mugs).",
            "Extra paid time off or flexible work hours."
        );
    } else if (budget === 'high') {
        generatedIdeas.push(
            "Performance bonuses or monetary awards.",
            "Company-sponsored trips or retreats.",
            "Professional development opportunities (e.g., conferences, certifications).",
            "Personalized gifts based on employee interests."
        );
    }

    let html = `<h2>Recognition Program Ideas for Goal: ${recognitionGoal} (${frequency} basis)</h2>`;
    html += '<ul>';
    generatedIdeas.forEach(idea => {
        html += `<li>${idea}</li>`;
    });
    html += '</ul>';

    ideasDiv.innerHTML = html;
});