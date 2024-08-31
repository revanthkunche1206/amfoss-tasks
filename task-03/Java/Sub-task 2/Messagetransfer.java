import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Messagetransfer {
    public static void main(String[] args) {
        try (BufferedReader inputReader = new BufferedReader(new FileReader("input.txt"));
             BufferedWriter outputWriter = new BufferedWriter(new FileWriter("output.txt"))) {
            String content = inputReader.readLine();
            while (content != null) {
                outputWriter.write(content);
                outputWriter.newLine();
                content = inputReader.readLine();
            }
        } catch (IOException e) {
            System.err.println("Error occurred while reading or writing the file: " + e.getMessage());
        }
    }
}
