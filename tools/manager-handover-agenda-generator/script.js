document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-agenda-btn');
    const agendaOutput = document.getElementById('agenda-output');
    const agendaContent = document.getElementById('agenda-content');
    const copyBtn = document.getElementById('copy-agenda-btn');

    generateBtn.addEventListener('click', () => {
        const departingEmployee = document.getElementById('departing-employee').value || '[Departing Employee Name]';
        const newOwner = document.getElementById('new-owner').value || '[New Owner Name/Role]';
        const meetingDate = document.getElementById('meeting-date').value || '[Meeting Date]';
        const meetingTime = document.getElementById('meeting-time').value || '[Meeting Time]';
        const keyTopics = document.getElementById('key-topics').value.split('\n').filter(line => line.trim() !== '');

        let topicsHtml = keyTopics.length > 0 ? `<ul>${keyTopics.map(topic => `<li>${topic.trim()}</li>`).join('')}</ul>` : '<p>[List key areas for discussion, e.g., Current project statuses, Client relationships, Pending tasks, Access credentials, Team dynamics.]</p>';

        agendaContent.innerHTML = "
            <h2>Manager Handover Meeting Agenda</h2>
            <p><strong>Date:</strong> ${meetingDate}</p>
            <p><strong>Time:</strong> ${meetingTime}</p>
            <p><strong>Attendees:</strong> ${departingEmployee}, ${newOwner}, [Manager/HR Representative]</p>
            <br>
            <h3>Purpose:</h3>
            <p>To facilitate a smooth and comprehensive handover of responsibilities from ${departingEmployee} to ${newOwner}, ensuring business continuity and effective knowledge transfer.</p>

            <h3>Agenda Items:</h3>
            <ol>
                <li><strong>Introduction & Overview (5 min)</strong>
                    <ul>
                        <li>Brief review of meeting purpose and objectives.</li>
                    </ul>
                </li>
                <li><strong>Role & Responsibilities Handover (30 min)</strong>
                    <ul>
                        <li>Discussion of current role responsibilities and key tasks.</li>
                        <li>Overview of ongoing projects and their current status.</li>
                    </ul>
                </li>
                <li><strong>Key Relationships & Stakeholders (20 min)</strong>
                    <ul>
                        <li>Identification of critical internal and external contacts (clients, partners, vendors).</li>
                        <li>Discussion of current relationship status and any specific nuances.</li>
                    </ul>
                </li>
                <li><strong>Pending Tasks & Deadlines (20 min)</strong>
                    <ul>
                        <li>Review of all outstanding tasks, deadlines, and priorities.</li>
                        <li>Discussion of any potential roadblocks or challenges.</li>
                    </ul>
                </li>
                <li><strong>Access & Systems (15 min)</strong>
                    <ul>
                        <li>Review of necessary system access, login credentials, and software.</li>
                        <li>Discussion of file storage locations and organizational systems.</li>
                    </ul>
                </li>
                <li><strong>Knowledge Transfer & Documentation (15 min)</strong>
                    <ul>
                        <li>Identification of critical documentation, guides, or processes.</li>
                        <li>Plan for any remaining knowledge transfer sessions.</li>
                    </ul>
                </li>
                <li><strong>Open Discussion & Questions (15 min)</strong>
                    <ul>
                        <li>Opportunity for ${departingEmployee} and ${newOwner} to ask questions.</li>
                        <li>Address any unaddressed concerns.</li>
                    </ul>
                </li>
                <li><strong>Next Steps & Follow-up (5 min)</strong>
                    <ul>
                        <li>Confirm action items and owners.</li>
                        <li>Schedule follow-up meetings if necessary.</li>
                    </ul>
                </li>
            </ol>

            <h3>Key Handover Topics to Discuss:</h3>
            ${topicsHtml}

            <h3>Action Items:</h3>
            <ul>
                <li>[Action Item 1] - [Owner] - [Due Date]</li>
                <li>[Action Item 2] - [Owner] - [Due Date]</li>
            </ul>

            <h3>Signatures:</h3>
            <p>_________________________<br>Departing Employee Signature & Date</p>
            <p>_________________________<br>New Owner Signature & Date</p>
            <p>_________________________<br>Manager Signature & Date</p>
        ";

        agendaOutput.classList.remove('hidden');
    });

    copyBtn.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(agendaContent);
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
