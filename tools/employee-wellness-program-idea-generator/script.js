document.getElementById('generate-btn').addEventListener('click', () => {
    const wellnessFocus = document.getElementById('wellness-focus').value;
    const budget = document.getElementById('budget').value.toLowerCase();
    const ideasDiv = document.getElementById('ideas');

    if (!wellnessFocus || !budget) {
        ideasDiv.innerHTML = '<p style="color: red;">Please select a wellness focus and budget.</p>';
        return;
    }

    let generatedIdeas = [];

    if (wellnessFocus === 'physical') {
        if (budget === 'low') {
            generatedIdeas.push(
                "Organize walking challenges or step competitions.",
                "Share healthy recipes and fitness tips in internal communications.",
                "Designate a quiet space for stretching or light exercise."
            );
        } else if (budget === 'medium') {
            generatedIdeas.push(
                "Subsidize gym memberships or fitness classes.",
                "Host on-site fitness workshops (e.g., yoga, Zumba).",
                "Provide healthy snacks and beverages in the office."
            );
        } else if (budget === 'high') {
            generatedIdeas.push(
                "Offer comprehensive health screenings and personalized wellness coaching.",
                "Implement a robust corporate fitness program with dedicated trainers.",
                "Provide ergonomic assessments and equipment for all workstations."
            );
        }
    } else if (wellnessFocus === 'mental') {
        if (budget === 'low') {
            generatedIdeas.push(
                "Promote mindfulness exercises or meditation apps.",
                "Create a 'quiet zone' for employees to de-stress.",
                "Share resources on stress management and mental health awareness."
            );
        } else if (budget === 'medium') {
            generatedIdeas.push(
                "Offer access to mental health counseling services (e.g., EAP).",
                "Host workshops on resilience, stress reduction, or emotional intelligence.",
                "Implement flexible work arrangements to support work-life balance."
            );
        } else if (budget === 'high') {
            generatedIdeas.push(
                "Provide on-site mental health professionals or regular therapy sessions.",
                "Develop comprehensive mental health training for managers and employees.",
                "Offer unlimited mental health days or enhanced paid time off for well-being."
            );
        }
    } else if (wellnessFocus === 'financial') {
        if (budget === 'low') {
            generatedIdeas.push(
                "Share articles and tips on personal finance and budgeting.",
                "Host brown-bag lunch sessions on financial literacy."
            );
        } else if (budget === 'medium') {
            generatedIdeas.push(
                "Offer access to financial planning workshops or webinars.",
                "Provide resources for debt management and retirement planning."
            );
        } else if (budget === 'high') {
            generatedIdeas.push(
                "Offer personalized financial coaching or advisory services.",
                "Provide employer-matched retirement contributions or stock options."
            );
        }
    } else if (wellnessFocus === 'social') {
        if (budget === 'low') {
            generatedIdeas.push(
                "Organize virtual or in-person team-building games and activities.",
                "Create employee interest groups or clubs (e.g., book club, hiking group)."
            );
        } else if (budget === 'medium') {
            generatedIdeas.push(
                "Host regular company social events (e.g., holiday parties, summer picnics).",
                "Sponsor employee participation in local charity events or volunteer days."
            );
        } else if (budget === 'high') {
            generatedIdeas.push(
                "Organize company-wide retreats or off-site team-building experiences.",
                "Invest in collaborative workspaces and social hubs within the office."
            );
        }
    }

    let html = `<h2>Employee Wellness Program Ideas (Focus: ${wellnessFocus.replace(/-/g, ' ').toUpperCase()}, Budget: ${budget.toUpperCase()}):</h2>`;
    html += '<ul>';
    generatedIdeas.forEach(idea => {
        html += `<li>${idea}</li>`;
    });
    html += '</ul>';

    ideasDiv.innerHTML = html;
});
