document.getElementById('generate-btn').addEventListener('click', () => {
    const year = document.getElementById('year').value;
    const country = document.getElementById('country').value.toLowerCase();
    const calendarDiv = document.getElementById('calendar');

    let complianceEvents = [];

    // General Annual Events
    complianceEvents.push(
        { month: 1, day: 1, event: "New Year's Day (Holiday)" },
        { month: 1, day: 31, event: "W-2/1099-NEC forms due to employees (USA)" },
        { month: 4, day: 15, event: "Tax Day (USA)" },
        { month: 7, day: 4, event: "Independence Day (USA Holiday)" },
        { month: 12, day: 25, event: "Christmas Day (Holiday)" }
    );

    // Country-specific events (example for USA)
    if (country === 'usa') {
        complianceEvents.push(
            { month: 1, day: 15, event: "Q4 Estimated Tax Payment Due (USA)" },
            { month: 3, day: 1, event: "EEO-1 Report Due (USA - for employers with 100+ employees)" },
            { month: 9, day: 30, event: "ACA Reporting Deadline (USA - for self-insured employers)" }
        );
    } else if (country === 'uk') {
        complianceEvents.push(
            { month: 4, day: 5, event: "End of Tax Year (UK)" },
            { month: 5, day: 31, event: "P60 forms due to employees (UK)" },
            { month: 7, day: 6, event: "P11D forms due to HMRC (UK)" }
        );
    }

    // Sort events by month and day
    complianceEvents.sort((a, b) => {
        if (a.month !== b.month) {
            return a.month - b.month;
        }
        return a.day - b.day;
    });

    let html = `<h2>HR Compliance Calendar for ${year} (${country.toUpperCase()})</h2>`;
    let currentMonth = 0;

    const monthNames = ["", "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];

    complianceEvents.forEach(event => {
        if (event.month !== currentMonth) {
            if (currentMonth !== 0) {
                html += '</ul></div>';
            }
            currentMonth = event.month;
            html += `<div class="month-section"><h3>${monthNames[currentMonth]}</h3><ul>`;
        }
        html += `<li class="event-item">${event.day}: ${event.event}</li>`;
    });
    html += '</ul></div>'; // Close last month section

    calendarDiv.innerHTML = html;
});
