document.getElementById('generate-btn').addEventListener('click', () => {
    const country = document.getElementById('country').value.toLowerCase();
    const industry = document.getElementById('industry').value.toLowerCase();
    const checklistDiv = document.getElementById('checklist');

    let checklistItems = [];

    // General HR Compliance
    checklistItems.push(
        "Maintain accurate employee records",
        "Comply with wage and hour laws",
        "Ensure workplace safety standards are met",
        "Provide equal employment opportunities",
        "Handle employee grievances appropriately"
    );

    // Country-specific compliance (example for USA)
    if (country === 'usa') {
        checklistItems.push(
            "Comply with FLSA (Fair Labor Standards Act)",
            "Comply with FMLA (Family and Medical Leave Act)",
            "Comply with ADA (Americans with Disabilities Act)",
            "Comply with OSHA (Occupational Safety and Health Act)",
            "Ensure I-9 compliance for all employees"
        );
    } else if (country === 'uk') {
        checklistItems.push(
            "Comply with GDPR (General Data Protection Regulation)",
            "Comply with Equality Act 2010",
            "Provide statutory sick pay (SSP)",
            "Provide statutory maternity/paternity pay"
        );
    }

    // Industry-specific compliance (example for Healthcare)
    if (industry === 'healthcare') {
        checklistItems.push(
            "Comply with HIPAA (Health Insurance Portability and Accountability Act)",
            "Ensure patient data privacy regulations are met",
            "Adhere to specific medical licensing and certification requirements"
        );
    } else if (industry === 'tech') {
        checklistItems.push(
            "Comply with data privacy regulations (e.g., CCPA, GDPR if applicable)",
            "Address intellectual property rights for employee-created work"
        );
    }

    if (checklistItems.length === 0) {
        checklistDiv.innerHTML = '<p style="color: red;">Please enter country and industry.</p>';
        return;
    }

    let html = `<h2>HR Compliance Checklist for ${country.toUpperCase()} - ${industry.toUpperCase()}</h2>`;
    html += '<ul>';
    checklistItems.forEach(item => {
        html += `<li class="checklist-item">${item}</li>`;
    });
    html += '</ul>';

    checklistDiv.innerHTML = html;
});