document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');

    calculateBtn.addEventListener('click', () => {
        const age = parseInt(document.getElementById('age').value);
        const yearsService = parseInt(document.getElementById('years-service').value);
        const weeklyPay = parseFloat(document.getElementById('weekly-pay').value);

        if (isNaN(age) || isNaN(yearsService) || isNaN(weeklyPay)) {
            alert('Please enter valid numbers for all fields.');
            return;
        }

        if (yearsService < 2) {
            document.getElementById('redundancy-pay-result').textContent = '0.00';
            alert('Employee must have at least 2 years of continuous service to be eligible for statutory redundancy pay.');
            return;
        }

        // Statutory caps (as of April 2024, for example purposes)
        const MAX_WEEKLY_PAY = 700;
        const MAX_YEARS_SERVICE = 20;

        const cappedWeeklyPay = Math.min(weeklyPay, MAX_WEEKLY_PAY);
        const cappedYearsService = Math.min(yearsService, MAX_YEARS_SERVICE);

        let weeksPay = 0;
        let service = cappedYearsService;
        let currentAge = age;

        // Loop backwards from the year of redundancy
        for (let i = 0; i < cappedYearsService; i++) {
            if (service > 0) {
                if (currentAge >= 41) {
                    weeksPay += 1.5;
                } else if (currentAge >= 22) {
                    weeksPay += 1.0;
                } else {
                    weeksPay += 0.5;
                }
                service--;
                currentAge--;
            }
        }

        const totalRedundancyPay = weeksPay * cappedWeeklyPay;

        document.getElementById('redundancy-pay-result').textContent = totalRedundancyPay.toFixed(2);
    });
});
