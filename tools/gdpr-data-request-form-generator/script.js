document.addEventListener('DOMContentLoaded', () => {
    const requestTypeSelect = document.getElementById('request-type');
    const dataSubjectNameInput = document.getElementById('data-subject-name');
    const dataSubjectEmailInput = document.getElementById('data-subject-email');
    const generateBtn = document.getElementById('generate-btn');
    const generatedFormText = document.getElementById('generated-form-text');
    const copyBtn = document.getElementById('copy-btn');

    const generateForm = () => {
        const requestType = requestTypeSelect.value;
        const name = dataSubjectNameInput.value.trim();
        const email = dataSubjectEmailInput.value.trim();

        if (!name || !email) {
            generatedFormText.value = "Please enter the Data Subject's Full Name and Email to generate the form.";
            return;
        }

        let formText = `Subject: GDPR Data ${requestType.replace('data-', '').replace('-', ' ').toUpperCase()} Request - ${name}\n\n`;
        formText += `Dear Data Protection Officer,\n\n`;
        formText += `I am writing to formally submit a Data ${requestType.replace('data-', '').replace('-', ' ').toUpperCase()} Request under the General Data Protection Regulation (GDPR).\n\n`;
        formText += `My details are as follows:\n`;
        formText += `Full Name: ${name}\n`;
        formText += `Email Address: ${email}\n\n`;

        switch (requestType) {
            case 'access':
                formText += `I hereby request access to all personal data concerning me that you hold. Please provide this information in a commonly used and machine-readable format.\n\n`;
                formText += `Please confirm receipt of this request and provide the requested information within one month, as stipulated by GDPR Article 12(3).\n\n`;
                break;
            case 'rectification':
                formText += `I hereby request the rectification of inaccurate personal data concerning me that you hold. Specifically, I wish to rectify the following:\n\n`;
                formText += `[Please specify the inaccurate data and the correct data here, e.g., 