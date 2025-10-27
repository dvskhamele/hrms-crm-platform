
document.addEventListener('DOMContentLoaded', () => {
    const calculateRoiBtn = document.getElementById('calculate-roi');
    const totalRecruitmentCostInput = document.getElementById('total-recruitment-cost');
    const averageEmployeeValueInput = document.getElementById('average-employee-value');
    const numberOfHiresInput = document.getElementById('number-of-hires');
    const resultDiv = document.getElementById('result');
    const emailCaptureDiv = document.getElementById('email-capture');
    const submitEmailBtn = document.getElementById('submit-email');
    const emailMessage = document.getElementById('email-message');

    const calculateROI = () => {
        const totalRecruitmentCost = parseFloat(totalRecruitmentCostInput.value);
        const averageEmployeeValue = parseFloat(averageEmployeeValueInput.value);
        const numberOfHires = parseInt(numberOfHiresInput.value);

        if (isNaN(totalRecruitmentCost) || isNaN(averageEmployeeValue) || isNaN(numberOfHires) || totalRecruitmentCost <= 0 || averageEmployeeValue <= 0 || numberOfHires <= 0) {
            alert('Please enter valid positive numbers for all fields.');
            return;
        }

        const totalValueGenerated = averageEmployeeValue * numberOfHires;
        const roi = ((totalValueGenerated - totalRecruitmentCost) / totalRecruitmentCost) * 100;

        resultDiv.innerHTML = `
            <h2>Recruitment ROI</h2>
            <p>Total Value Generated: $${totalValueGenerated.toLocaleString()}</p>
            <p>Total Recruitment Cost: $${totalRecruitmentCost.toLocaleString()}</p>
            <p><strong>ROI: ${roi.toFixed(2)}%</strong></p>
        `;
        resultDiv.style.display = 'block';
        emailCaptureDiv.style.display = 'block';

        logAnalytics('roi_calculated');
    };

    const handleEmailSubmit = () => {
        const email = document.getElementById('email').value;
        if (email && /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            const leadData = {
                email: email,
                tool: 'Recruitment ROI Calculator',
                timestamp: new Date().toISOString()
            };
            saveLead(leadData);
            emailMessage.textContent = 'Thank you! Your ROI report has been sent to your email.';
            emailMessage.style.color = 'green';
        } else {
            emailMessage.textContent = 'Please enter a valid email address.';
            emailMessage.style.color = 'red';
        }
    };

    const saveLead = (leadData) => {
        console.log('Lead Captured:', JSON.stringify(leadData));
    };

    const logAnalytics = (eventName) => {
        console.log(`Analytics Event: ${eventName}`);
    };

    calculateRoiBtn.addEventListener('click', calculateROI);
    submitEmailBtn.addEventListener('click', handleEmailSubmit);
});
