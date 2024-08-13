num = File.read('input.txt')
n = num.chomp.to_i

File.open('output.txt','w') do |pattern|

	for i in 0..n-1
    		for j in i..n-1
        		pattern.print "  "
    		end	
    		for j in 0..i
        		pattern.print "* "
    		end	
    		for j in 0..i-1
        		pattern.print "* "
    		end
    		pattern.puts(" ")
	end
	for i in 0..n
    		for j in 0..i-1
        		pattern.print "  "
    		end
    		for j in i..n-1
        		pattern.print "* "
    		end
    		for j in i..n
        		pattern.print "* "
    		end
    		pattern.puts(" ")
	end
end
