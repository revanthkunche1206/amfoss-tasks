use std::fs::File;
use std::io::{BufRead, BufReader, Write};

fn main() -> std::io::Result<()> {
    let input = File::open("input.txt")?;
    let mut reader = BufReader::new(input);
    let mut n_str = String::new();
    reader.read_line(&mut n_str)?;
    let n: usize = n_str.trim().parse().expect("Failed to parse input as integer");

    let mut output = File::create("output.txt")?;

    for i in 0..n {
        for _ in i..n {
            write!(output, "  ")?;
        }
        for _ in 0..=i {
            write!(output, "* ")?;
        }
        for _ in 0..i {
            write!(output, "* ")?;
        }
        writeln!(output)?;
    }

    for i in 0..=n {
        for _ in 0..i {
            write!(output, "  ")?;
        }
        for _ in i..n {
            write!(output, "* ")?;
        }
        for _ in i..=n {
            write!(output, "* ")?;
        }
        writeln!(output)?;
    }

    Ok(())
}
