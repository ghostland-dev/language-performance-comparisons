import 'dart:collection';
import 'dart:developer';

class Result {
  final String method;
  final double time; // Execution time in milliseconds
  final double memory; // Memory usage in MB

  Result(this.method, this.time, this.memory);

  @override
  String toString() => "$method: ${time.toStringAsFixed(2)} ms, ${memory.toStringAsFixed(2)} MB";
}

void main() {
  // Generate a list of 1 million numbers
  List<int> numbers = List<int>.generate(1_000_000, (i) => i);

  // Store the results
  List<Result> results = [];

  // Measure For Loop
  measureMethod("For Loop", () {
    List<int> result = [];
    for (int i = 0; i < numbers.length; i++) {
      result.add(numbers[i] * 2);
    }
  }, results);

  // Measure ForEach Loop
  measureMethod("ForEach Loop", () {
    List<int> result = [];
    for (var num in numbers) {
      result.add(num * 2);
    }
  }, results);

  // Measure While Loop
  measureMethod("While Loop", () {
    List<int> result = [];
    int i = 0;
    while (i < numbers.length) {
      result.add(numbers[i] * 2);
      i++;
    }
  }, results);

  // Measure Map Method
  measureMethod("Map Method", () {
    List<int> result = numbers.map((num) => num * 2).toList();
  }, results);

  // Measure Filter Method
  measureMethod("Filter Method", () {
    List<int> result = numbers.where((num) => num % 2 == 0).toList();
  }, results);

  // Measure Reduce Method
  measureMethod("Reduce Method", () {
    int sum = numbers.reduce((acc, num) => acc + num);
  }, results);

  // Print results
  print("Execution Results:");
  for (var result in results) {
    print(result);
  }

  // Find the fastest and most memory-consuming methods
  var fastest = results.reduce((a, b) => a.time < b.time ? a : b);
  var mostMemory = results.reduce((a, b) => a.memory > b.memory ? a : b);

  print("\nFastest Method: $fastest");
  print("Most Resource-Consuming Method: $mostMemory");
}

// Measures the execution time and memory usage of a method
void measureMethod(String name, void Function() callback, List<Result> results) {
  // Record memory usage before execution
  int memoryBefore = _currentMemoryUsage();

  // Measure execution time
  Stopwatch stopwatch = Stopwatch()..start();
  callback();
  stopwatch.stop();

  // Record memory usage after execution
  int memoryAfter = _currentMemoryUsage();

  // Calculate memory usage in MB
  double memoryUsage = (memoryAfter - memoryBefore) / (1024 * 1024);

  // Calculate execution time in milliseconds
  double time = stopwatch.elapsedMicroseconds / 1000.0;

  // Store the result
  results.add(Result(name, time, memoryUsage));
}

// Gets the current memory usage in bytes
int _currentMemoryUsage() {
  return (HeapSpace.current as dynamic).used;
}
