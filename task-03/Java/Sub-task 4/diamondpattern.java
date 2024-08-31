import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.BufferedReader;

public class diamondpattern{
    public static void main(String[] args) {
        try (BufferedReader input = new BufferedReader(new FileReader("input.txt"));
             BufferedWriter output = new BufferedWriter(new FileWriter("output.txt"))) {
            int n = Integer.parseInt(input.readLine());

            for (int i = 0; i < n; i++) {
                for (int j = i; j < n; j++) {
                    output.write("  ");
                }
                for (int j = 0; j <= i; j++) {
                    output.write("* ");
                }
                for (int j = 0; j < i; j++) {
                    output.write("* ");
                }
                output.newLine();
            }

            for (int i = 0; i <= n; i++) {
                for (int j = 0; j < i; j++) {
                    output.write("  ");
                }
                for (int j = i; j < n; j++) {
                    output.write("* ");
                }
                for (int j = i; j <= n; j++) {
                    output.write("* ");
                }
                output.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
