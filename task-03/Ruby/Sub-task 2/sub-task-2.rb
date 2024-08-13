input_content = File.read('input.txt')

File.open('output.txt','w') do |output_content|
	output_content.write(input_content)
end
