package main
import(
    "fmt"
    "io/ioutil"

)

func main() {
    input, err := ioutil.ReadFile("input.txt")
    if err != nil {
        fmt.Println("Failed to read input file: %s", err)
    }


    err = ioutil.WriteFile("output.txt", input, 0644)
    if err != nil {
        fmt.Println("Failed to write to output file: %s", err)
    }
}
