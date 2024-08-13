package main

import "fmt"

func main(){
	fmt.Println("Enter the value of n: ")
	var n int
	fmt.Scanln(&n)
	for i:=0;i<n;i++{
		for j:=i;j<n;j++{
			fmt.Print("  ")
		}
		for j:=0;j<=i;j++{
			fmt.Print("* ")
		}
		for j:=0;j<i;j++{
			fmt.Print("* ")
		}
	fmt.Println(" ")
	}
	for i:=0;i<=n;i++{
                for j:=0;j<i;j++{ 
                        fmt.Print("  ") 
                }
                for j:=i;j<n;j++{
                        fmt.Print("* ")
                }
                for j:=i;j<=n;j++{
                        fmt.Print("* ")
                }
        fmt.Println(" ")
        }
}
