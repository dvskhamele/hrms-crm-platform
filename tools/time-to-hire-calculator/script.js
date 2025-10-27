const jobPostedDateInput = document.getElementById('job-posted-date');
const offerAcceptedDateInput = document.getElementById('offer-accepted-date');
const calculateBtn = document.getElementById('calculate-btn');
const timeToHireSpan = document.getElementById('time-to-hire');

calculateBtn.addEventListener('click', () => {
    const jobPostedDate = new Date(jobPostedDateInput.value);
    const offerAcceptedDate = new Date(offerAcceptedDateInput.value);

    if (isNaN(jobPostedDate.getTime()) || isNaN(offerAcceptedDate.getTime())) {
        timeToHireSpan.textContent = "Invalid Date(s)";
        return;
    }

    const timeDifference = offerAcceptedDate.getTime() - jobPostedDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    timeToHireSpan.textContent = daysDifference >= 0 ? daysDifference : "Invalid Date Range";
});