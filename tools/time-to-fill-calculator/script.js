document.getElementById('calculate-btn').addEventListener('click', () => {
    const requisitionDate = new Date(document.getElementById('requisition-date').value);
    const offerAcceptanceDate = new Date(document.getElementById('offer-acceptance-date').value);

    if (isNaN(requisitionDate) || isNaN(offerAcceptanceDate)) {
        document.getElementById('results').innerHTML = '<p style="color: red;">Please enter valid dates.</p>';
        return;
    }

    const timeToFill = Math.ceil((offerAcceptanceDate - requisitionDate) / (1000 * 60 * 60 * 24));

    document.getElementById('results').innerHTML = `<h2>Your Time to Fill is: ${timeToFill} days</h2>`;
});
