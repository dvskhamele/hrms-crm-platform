document.addEventListener('DOMContentLoaded', () => {
    const holidays = [
        { name: "New Year's Day", date: "2026-01-01" },
        { name: "Martin Luther King, Jr. Day", date: "2026-01-19" },
        { name: "Presidents' Day", date: "2026-02-16" },
        { name: "Memorial Day", date: "2026-05-25" },
        { name: "Juneteenth", date: "2026-06-19" },
        { name: "Independence Day", date: "2026-07-03" }, // Observed
        { name: "Labor Day", date: "2026-09-07" },
        { name: "Thanksgiving Day", date: "2026-11-26" },
        { name: "Day after Thanksgiving", date: "2026-11-27" },
        { name: "Christmas Day", date: "2026-12-25" }
    ];

    const calendarContainer = document.getElementById('holiday-calendar');
    const today = new Date();
    // Set hours to 0 to compare dates only
    today.setHours(0, 0, 0, 0);

    holidays.forEach(holiday => {
        const holidayDate = new Date(holiday.date + 'T00:00:00');
        const card = document.createElement('div');
        card.className = 'holiday-card';

        if (holidayDate < today) {
            card.classList.add('past');
        }

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        card.innerHTML = `
            <h3>${holiday.name}</h3>
            <p>${holidayDate.toLocaleDateString('en-US', dateOptions)}</p>
        `;

        calendarContainer.appendChild(card);
    });
});
