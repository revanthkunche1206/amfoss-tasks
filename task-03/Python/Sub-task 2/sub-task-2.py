with open('input.txt','r') as input_txt:
	content=input_txt.read()

with open('output.txt','w') as output_txt:
	output_txt.write(content)
