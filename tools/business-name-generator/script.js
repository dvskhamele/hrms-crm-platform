const prefixes = ['Apex', 'Stellar', 'Zenith', 'Nova', 'Quantum', 'Fusion', 'Synergy', 'Catalyst', 'Momentum', 'Elevate'];
const suffixes = ['Solutions', 'Group', 'Ventures', 'Labs', 'Co', 'Works', 'Studios', 'Consulting', 'Dynamics', 'Enterprises'];

const keywordInput = document.getElementById('keyword');
const generateBtn = document.getElementById('generate-btn');
const namesContainer = document.getElementById('names-container');

generateBtn.addEventListener('click', () => {
    const keyword = keywordInput.value.trim();
    if (!keyword) {
        alert('Please enter a keyword.');
        return;
    }

    namesContainer.innerHTML = '';

    const generatedNames = new Set();

    // Generate names by combining prefixes and keyword
    for (let i = 0; i < 10; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        generatedNames.add(`${prefix} ${keyword}`);
    }

    // Generate names by combining keyword and suffixes
    for (let i = 0; i < 10; i++) {
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        generatedNames.add(`${keyword} ${suffix}`);
    }

    // Generate names by combining prefixes, keyword, and suffixes
    for (let i = 0; i < 10; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
        generatedNames.add(`${prefix} ${keyword} ${suffix}`);
    }

    generatedNames.forEach(name => {
        const nameCard = document.createElement('div');
        nameCard.classList.add('name-card');
        nameCard.textContent = name;
        namesContainer.appendChild(nameCard);
    });
});
