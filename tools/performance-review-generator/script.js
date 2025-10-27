document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const generatedReview = document.getElementById('generated-review');

    const phrases = {
        qualityOfWork: {
            exceeds: "consistently delivers work of exceptional quality, often exceeding expectations.",
            meets: "produces solid and reliable work that meets all job requirements.",
            needsImprovement: "has shown some inconsistencies in the quality of their work and would benefit from greater attention to detail."
        },
        communication: {
            exceeds: "is an excellent communicator, both written and verbally. They keep stakeholders well-informed.",
            meets: "communicates effectively with their team and manager.",
            needsImprovement: "could improve their communication by providing more regular updates and ensuring clarity in their messages."
        },
        collaboration: {
            exceeds: "is a highly collaborative team player who actively seeks out opportunities to support their colleagues.",
            meets: "works well with others and is a positive team member.",
            needsImprovement: "would benefit from more actively participating in team discussions and offering support to colleagues."
        }
    };

    generateBtn.addEventListener('click', () => {
        const employeeName = document.getElementById('employee-name').value || "The employee";
        const quality = document.getElementById('quality-of-work').value;
        const comms = document.getElementById('communication').value;
        const collab = document.getElementById('collaboration').value;

        const reviewText = `${employeeName} ${phrases.qualityOfWork[quality]} `
                         + `${employeeName} ${phrases.communication[comms]} `
                         + `Furthermore, ${employeeName.toLowerCase()} ${phrases.collaboration[collab]}`;
        
        generatedReview.value = reviewText;
    });

    copyBtn.addEventListener('click', () => {
        if (generatedReview.value) {
            navigator.clipboard.writeText(generatedReview.value)
                .then(() => {
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copy to Clipboard';
                    }, 2000);
                })
                .catch(err => {
                    alert('Failed to copy text.');
                });
        }
    });
});
