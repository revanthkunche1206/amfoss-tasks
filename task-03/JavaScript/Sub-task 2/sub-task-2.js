const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    fs.writeFile('output.txt', data, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
