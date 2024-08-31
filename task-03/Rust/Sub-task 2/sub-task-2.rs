use std::fs::File;
use std::io::{Read, Write};

fn main() {
    
    let mut input_file = File::open("input.txt").expect("Failed to open input file");
    let mut content = String::new();
    input_file.read_to_string(&mut content).expect("Failed to read input file");

    let mut output_file = File::create("output.txt").expect("Failed to create output file");
    output_file.write_all(content.as_bytes()).expect("Failed to write to output file");
}
