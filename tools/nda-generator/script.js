
document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-nda-btn');
    const ndaOutput = document.getElementById('nda-output');
    const ndaContent = document.getElementById('nda-content');
    const copyBtn = document.getElementById('copy-nda-btn');

    generateBtn.addEventListener('click', () => {
        const companyName = document.getElementById('company-name').value || '[Your Company Name]';
        const recipientName = document.getElementById('recipient-name').value || '[Receiving Party Name]';
        const agreementDate = document.getElementById('agreement-date').value || new Date().toLocaleDateString();
        const purpose = document.getElementById('purpose').value || '[Describe the purpose for which confidential information is being disclosed, e.g., evaluating a potential business partnership, discussing a new product idea, etc.]';

        ndaContent.innerHTML = `
            <h2>Non-Disclosure Agreement (NDA)</h2>
            <p><strong>Effective Date:</strong> ${agreementDate}</p>

            <h3>1. Parties</h3>
            <p>This Non-Disclosure Agreement (the "Agreement") is made between <strong>${companyName}</strong> (the "Disclosing Party") and <strong>${recipientName}</strong> (the "Receiving Party").</p>

            <h3>2. Purpose</h3>
            <p>The Disclosing Party wishes to disclose certain confidential information to the Receiving Party for the purpose of: ${purpose}.</p>

            <h3>3. Definition of Confidential Information</h3>
            <p>"Confidential Information" means any and all non-public information, whether written or oral, disclosed by the Disclosing Party to the Receiving Party, including but not limited to business plans, financial data, customer lists, technical data, product designs, and marketing strategies.</p>

            <h3>4. Obligations of Receiving Party</h3>
            <p>The Receiving Party agrees:</p>
            <ul>
                <li>To hold the Confidential Information in strict confidence.</li>
                <li>Not to disclose the Confidential Information to any third party without the prior written consent of the Disclosing Party.</li>
                <li>To use the Confidential Information solely for the Purpose stated in this Agreement.</li>
                <li>To take all reasonable measures to protect the secrecy of and avoid disclosure or unauthorized use of the Confidential Information.</li>
            </ul>

            <h3>5. Exclusions from Confidential Information</h3>
            <p>Confidential Information does not include information that:</p>
            <ul>
                <li>Is or becomes publicly available through no fault of the Receiving Party.</li>
                <li>Was known to the Receiving Party prior to its disclosure by the Disclosing Party.</li>
                <li>Is rightfully obtained by the Receiving Party from a third party without restriction on disclosure.</li>
                <li>Is independently developed by the Receiving Party without use of or reference to the Disclosing Party's Confidential Information.</li>
            </ul>

            <h3>6. Term</h3>
            <p>This Agreement shall remain in effect for a period of [e.g., five (5) years] from the Effective Date, or until the Confidential Information is no longer confidential, whichever occurs first.</p>

            <h3>7. Return of Confidential Information</h3>
            <p>Upon the written request of the Disclosing Party, the Receiving Party shall immediately return or destroy all Confidential Information received from the Disclosing Party.</p>

            <h3>8. Governing Law</h3>
            <p>This Agreement shall be governed by and construed in accordance with the laws of the State of [Your State].</p>

            <h3>Signatures</h3>
            <p>_________________________<br>Disclosing Party Signature & Date</p>
            <p>_________________________<br>Receiving Party Signature & Date</p>
        `;

        ndaOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(ndaContent);
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand('copy');
        window.getSelection().removeAllRanges();// to deselect

        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Document';
        }, 2000);
    });
});
