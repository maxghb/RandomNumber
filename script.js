document.addEventListener('DOMContentLoaded', () => {
    const colorButton = document.getElementById('colorButton');
    const rollNumbersButton = document.getElementById('rollNumbersButton');
    const numbers = document.querySelectorAll('.number');
    const colors = ['#ffebcd', '#add8e6', '#90ee90', '#ffb6c1', '#ffffe0'];

    colorButton.addEventListener('click', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });

    rollNumbersButton.addEventListener('click', () => {
        const duration = 2000; // Total duration for numbers to run randomly (2 seconds)
        const startTime = Date.now();
        let intervalId;

        const startRolling = () => {
            intervalId = setInterval(() => {
                numbers.forEach(number => {
                    const randomNumber = Math.floor(Math.random() * 10);
                    number.textContent = randomNumber;
                });
            }, 100); // Update numbers every 100 milliseconds
        };

        const stopRolling = () => {
            clearInterval(intervalId);
            numbers.forEach(number => {
                const randomNumber = Math.floor(Math.random() * 10);
                number.textContent = randomNumber;
            });
        };

        // Start rolling numbers
        startRolling();

        // Stop rolling numbers after 4 seconds
        setTimeout(() => {
            stopRolling();
        }, duration);

        // Prevent multiple clicks during animation
        rollNumbersButton.disabled = true;
        
        // Re-enable button after animation finishes
        setTimeout(() => {
            rollNumbersButton.disabled = false;
        }, duration + 100); // Add a small buffer to ensure button gets re-enabled after animation finishes
    });
});
