import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class main {

    static class Result {
        String method;
        double time;    // Execution time in milliseconds
        double memory;  // Memory usage in MB

        public Result(String method, double time, double memory) {
            this.method = method;
            this.time = time;
            this.memory = memory;
        }

        @Override
        public String toString() {
            return String.format("%s: %.2f ms, %.2f MB", method, time, memory);
        }
    }

    public static void main(String[] args) {
        // Generate an array of 1 million numbers
        List<Integer> numbers = new ArrayList<>();
        for (int i = 0; i < 1_000_000; i++) {
            numbers.add(i);
        }

        List<Result> results = new ArrayList<>();

        // Measure For Loop
        measureMethod("For Loop", () -> {
            List<Integer> result = new ArrayList<>();
            for (int i = 0; i < numbers.size(); i++) {
                result.add(numbers.get(i) * 2);
            }
        }, results);

        // Measure ForEach Loop
        measureMethod("ForEach Loop", () -> {
            List<Integer> result = new ArrayList<>();
            for (Integer num : numbers) {
                result.add(num * 2);
            }
        }, results);

        // Measure While Loop
        measureMethod("While Loop", () -> {
            List<Integer> result = new ArrayList<>();
            int i = 0;
            while (i < numbers.size()) {
                result.add(numbers.get(i) * 2);
                i++;
            }
        }, results);

        // Measure Map Method
        measureMethod("Map Method", () -> {
            List<Integer> result = numbers.stream()
                                          .map(num -> num * 2)
                                          .collect(Collectors.toList());
        }, results);

        // Measure Filter Method
        measureMethod("Filter Method", () -> {
            List<Integer> result = numbers.stream()
                                          .filter(num -> num % 2 == 0)
                                          .collect(Collectors.toList());
        }, results);

        // Measure Reduce Method
        measureMethod("Reduce Method", () -> {
            int sum = numbers.stream()
                             .reduce(0, Integer::sum);
        }, results);

        // Print results
        System.out.println("Execution Results:");
        for (Result result : results) {
            System.out.println(result);
        }

        // Find fastest and most memory-consuming methods
        Result fastest = results.stream().min((a, b) -> Double.compare(a.time, b.time)).get();
        Result mostMemory = results.stream().max((a, b) -> Double.compare(a.memory, b.memory)).get();

        System.out.println("\nFastest Method: " + fastest);
        System.out.println("Most Resource-Consuming Method: " + mostMemory);
    }

    // Utility to measure execution time and memory usage
    private static void measureMethod(String name, Runnable callback, List<Result> results) {
        // Record memory usage before execution
        long memoryBefore = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();

        // Record start time
        long startTime = System.nanoTime();

        // Execute the callback
        callback.run();

        // Record end time
        long endTime = System.nanoTime();

        // Record memory usage after execution
        long memoryAfter = Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory();

        // Calculate time and memory usage
        double time = (endTime - startTime) / 1_000_000.0;  // Convert to milliseconds
        double memory = (memoryAfter - memoryBefore) / (1024.0 * 1024.0);  // Convert to MB

        results.add(new Result(name, time, memory));
    }
}
