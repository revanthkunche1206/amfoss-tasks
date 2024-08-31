use std::io;

fn main() {
    
    let mut input = String::new();
    println!("Enter the value of n: ");
    io::stdin().read_line(&mut input).expect("Failed to read line");
    let n: usize = input.trim().parse().expect("Please enter a valid number");

    
    for i in 0..n {
        for _ in i..n {
            print!("  ");
        }
        for _ in 0..=i {
            print!("* ");
        }
        for _ in 0..i {
            print!("* ");
        }
        println!();
    }

    
    for i in 0..=n {
        for _ in 0..i {
            print!("  ");
        }
        for _ in i..n {
            print!("* ");
        }
        for _ in i..=n {
            print!("* ");
        }
        println!();
    }
}
