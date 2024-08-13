puts "Enter the value of n: "
n = gets.chomp.to_i

for i in 0..n-1
    for j in i..n-1
        print "  "
    end	
    for j in 0..i
        print "* "
    end	
    for j in 0..i-1
        print "* "
    end
    puts(" ")
end
for i in 0..n
    for j in 0..i-1
        print "  "
    end
    for j in i..n-1
        print "* "
    end
    for j in i..n
        print "* "
    end
    puts(" ")
end
