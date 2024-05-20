document.addEventListener('DOMContentLoaded', () => {
    const colorButton = document.getElementById('colorButton');
    const rollNumbersButton = document.getElementById('rollNumbersButton');
    const resetButton = document.getElementById('resetButton');
    const numberCells = document.querySelectorAll('.number');
    const resultTable = document.getElementById('resultTable');
    const colors = ['#ffebcd', '#add8e6', '#90ee90', '#ffb6c1', '#ffffe0'];
    let rollCounter = 0; // Counter to keep track of the number of rolls

    colorButton.addEventListener('click', () => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    });

    rollNumbersButton.addEventListener('click', () => {
        const result = [];
        const duration = 3000; // Total duration for numbers to run randomly (3 seconds)

        // Increment roll counter
        rollCounter++;

        // Start rolling numbers
        const startRolling = () => {
            numberCells.forEach((cell, index) => {
                const intervalId = setInterval(() => {
                    const randomNumber = Math.floor(Math.random() * 10); // Generate random number between 0 and 9
                    cell.textContent = randomNumber;
                    result[index] = randomNumber;
                }, 100); // Update numbers every 100 milliseconds

                // Stop rolling numbers after 3 seconds
                setTimeout(() => {
                    clearInterval(intervalId);
                    // Store last 6 digits
                    const lastResult = result.slice(-6).join('');
                    // Store result with roll number
                    localStorage.setItem(`Roll ${rollCounter}`, lastResult);
                    // Update results table to show all results
                    updateResultsTable();
                }, duration);
            });
        };

        // Start rolling numbers
        startRolling();
    });

    resetButton.addEventListener('click', () => {
        // Clear local storage
        localStorage.clear();
        // Clear table
        resultTable.innerHTML = '';
        // Reset number cells
        numberCells.forEach(cell => {
            cell.textContent = '0';
        });
        // Reset roll counter
        rollCounter = 0;
    });

    function updateResultsTable() {
        // Clear current table contents
        resultTable.innerHTML = '<tr><th>Roll Number</th><th>Result</th></tr>';
        
        // Display all results in table
        for (let i = 1; i <= rollCounter; i++) {
            const rollResult = localStorage.getItem(`Roll ${i}`);
            if (rollResult) {
                const row = document.createElement('tr');
                const rollNumberCell = document.createElement('td');
                const resultCell = document.createElement('td');
                rollNumberCell.textContent = i;
                resultCell.textContent = rollResult;
                row.appendChild(rollNumberCell);
                row.appendChild(resultCell);
                resultTable.appendChild(row);
            }
        }
    }

    // Load initial results on page load
    updateResultsTable();
});
