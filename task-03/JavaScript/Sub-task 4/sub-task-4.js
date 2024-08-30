const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const n = parseInt(data.trim());
    let diamond = '';

    // Upper part of the diamond
    for (let i = 0; i < n; i++) {
        // Print leading spaces
        for (let j = i; j < n - 1; j++) {
            diamond += " ";
        }
        // Print first half of asterisks
        for (let j = 0; j <= i; j++) {
            diamond += "*";
        }
        // Print second half of asterisks
        for (let j = 0; j < i; j++) {
            diamond += "*";
        }
        diamond += "\n"; // Move to the next line
    }

    // Lower part of the diamond
    for (let i = n - 2; i >= 0; i--) {
        // Print leading spaces
        for (let j = i; j < n - 1; j++) {
            diamond += " ";
        }
        // Print first half of asterisks
        for (let j = 0; j <= i; j++) {
            diamond += "*";
        }
        // Print second half of asterisks
        for (let j = 0; j < i; j++) {
            diamond += "*";
        }
        diamond += "\n"; // Move to the next line
    }

    fs.writeFile('output.txt', diamond, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
