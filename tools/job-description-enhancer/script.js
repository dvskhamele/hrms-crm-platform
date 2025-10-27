const jobDescriptionInput = document.getElementById('job-description-input');
const enhanceBtn = document.getElementById('enhance-btn');
const enhancedDescriptionPre = document.getElementById('enhanced-description');

enhanceBtn.addEventListener('click', () => {
    const originalDescription = jobDescriptionInput.value;
    let enhancedDescription = originalDescription;

    if (!originalDescription.trim()) {
        enhancedDescriptionPre.textContent = "Please enter a job description to enhance.";
        return;
    }

    // Rule 1: Suggest stronger action verbs (simple replacement for demonstration)
    enhancedDescription = enhancedDescription.replace(/responsible for/gi, 'Manage');
    enhancedDescription = enhancedDescription.replace(/duties include/gi, 'Execute');
    enhancedDescription = enhancedDescription.replace(/will be involved in/gi, 'Contribute to');

    // Rule 2: Suggest inclusive language (similar to optimizer, but focused on enhancement)
    enhancedDescription = enhancedDescription.replace(/he\/she/gi, 'they');
    enhancedDescription = enhancedDescription.replace(/him\/her/gi, 'them');
    enhancedDescription = enhancedDescription.replace(/guys/gi, 'team members');

    // Rule 3: Add a call to action if not explicitly present
    if (!enhancedDescription.toLowerCase().includes('apply now') &&
        !enhancedDescription.toLowerCase().includes('submit your application')) {
        enhancedDescription += "\n\n**Ready to make an impact? Apply now!**";
    }

    // Rule 4: Suggest adding bullet points for readability if not already present
    if (!enhancedDescription.includes('•') && !enhancedDescription.includes('-') && !enhancedDescription.includes('*')) {
        enhancedDescription += "\n\n[Suggestion: Use bullet points for responsibilities and qualifications to improve readability.]";
    }

    // Rule 5: Suggest quantifying achievements if possible
    if (enhancedDescription.toLowerCase().includes('managed') || enhancedDescription.toLowerCase().includes('developed')) {
        enhancedDescription += "\n\n[Suggestion: Where possible, quantify your achievements with numbers and metrics (e.g., 'Managed a team of 5', 'Increased sales by 15%').]";
    }

    enhancedDescriptionPre.textContent = enhancedDescription;
});