with open('input.txt','r') as input:
	n=int(input.read())

with open('output.txt', 'w') as output:
    for i in range(n):
        for j in range(i, n):
            output.write("  ")
        for j in range(i + 1):
            output.write("* ")
        for j in range(i):
            output.write("* ")
        output.write("\n")
    for i in range(n + 1):
        for j in range(i):
            output.write("  ",)
        for j in range(i, n):
            output.write("* ")
        for j in range(i, n + 1):
            output.write("* ")
        output.write("\n")
