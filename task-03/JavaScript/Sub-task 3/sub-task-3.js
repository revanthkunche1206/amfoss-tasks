const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

readline.question("Enter the value of n: ", (input) => {
    const n = parseInt(input);
    pattern(n)
    readline.close();
});



function pattern(n){
	for (let i = 0; i < n; i++) {

        for (let j = i; j < n; j++) {
            process.stdout.write("  ");
        }

        for (let j = 0; j <= i; j++) {
            process.stdout.write("* ");
        }

        for (let j = 0; j < i; j++) {
            process.stdout.write("* ");
        }
        console.log();
    }

    for (let i = 0; i <= n; i++) {

       for (let j = 0; j < i; j++) {
            process.stdout.write("  ");
        }

        for (let j = i; j < n; j++) {
            process.stdout.write("* ");
        }

        for (let j = i; j <= n; j++) {
            process.stdout.write("* ");
        }
        console.log();
    }


}



