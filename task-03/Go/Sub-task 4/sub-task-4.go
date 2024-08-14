package main
import(
    "fmt"
    "io/ioutil"
    "strconv"
    "strings"

)

func main() {
    input, err := ioutil.ReadFile("input.txt")
    if err != nil {
        fmt.Println("Failed to read input file: %s", err)
    }


    n, err := strconv.Atoi(strings.TrimSpace(string(input)))
    if err != nil {
        fmt.Println("Failed to convert input to a number: %s", err)
    }


    var pattern string
    for i:=0;i<n;i++{
		for j:=i;j<n;j++{
			pattern+="  "
		}
		for j:=0;j<=i;j++{
			pattern+="* "
		}
		for j:=0;j<i;j++{
			pattern+="* "
		}
	pattern+="\n"
	}
	for i:=0;i<=n;i++{
                for j:=0;j<i;j++{
                        pattern+="  "
                }
                for j:=i;j<n;j++{
                        pattern+="* "
                }
                for j:=i;j<=n;j++{
                        pattern+="* "
                }
        pattern+="\n"
        }

    err = ioutil.WriteFile("output.txt",[]byte(pattern), 0644)
    if err != nil {
        fmt.Println("Failed to write to output file: %s", err)
    }
}
