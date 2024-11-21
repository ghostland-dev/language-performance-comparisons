// Type to store the results for each method
type Result = {
    method: string;  // Name of the method being measured
    time: number;    // Execution time in milliseconds
    memory: number;  // Memory usage in MB
};

// Results array to store each method's performance data
const results: Result[] = [];

/**
 * Measures the execution time and memory usage of a given method.
 *
 * @param name - The name of the method being tested.
 * @param callback - The function representing the method's logic.
 */
function measureMethod(name: string, callback: () => void): void {
    // Record memory usage before execution
    const memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;

    // Start timing the execution
    const start = performance.now();

    // Execute the callback
    callback();

    // Stop timing the execution
    const end = performance.now();

    // Record memory usage after execution
    const memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;

    // Store the result
    results.push({
        method: name,
        time: parseFloat((end - start).toFixed(2)),
        memory: parseFloat((memoryAfter - memoryBefore).toFixed(2)),
    });
}

// Generate an array of 1 million numbers
const numbers: number[] = Array.from({ length: 1_000_000 }, (_, i) => i);

// 1. For Loop
measureMethod("For Loop", () => {
    const result: number[] = [];
    for (let i = 0; i < numbers.length; i++) {
        result.push(numbers[i] * 2);
    }
});

// 2. ForEach Loop
measureMethod("ForEach Loop", () => {
    const result: number[] = [];
    numbers.forEach((num: number) => {
        result.push(num * 2);
    });
});

// 3. While Loop
measureMethod("While Loop", () => {
    const result: number[] = [];
    let i: number = 0;
    while (i < numbers.length) {
        result.push(numbers[i] * 2);
        i++;
    }
});

// 4. Map Method
measureMethod("Map Method", () => {
    const result: number[] = numbers.map((num: number) => num * 2);
});

// 5. Filter Method
measureMethod("Filter Method", () => {
    const result: number[] = numbers.filter((num: number) => num % 2 === 0);
});

// 6. Reduce Method
measureMethod("Reduce Method", () => {
    const sum: number = numbers.reduce((acc: number, num: number) => acc + num, 0);
});

// Find the fastest and most memory-consuming methods
const fastest: Result = results.reduce((a, b) => (a.time < b.time ? a : b));
const mostMemory: Result = results.reduce((a, b) => (a.memory > b.memory ? a : b));

// Print results
console.log("Execution Results:");
results.forEach((result: Result) =>
    console.log(`${result.method}: ${result.time} ms, ${result.memory} MB`)
);

console.log(`\nFastest Method: ${fastest.method} (${fastest.time} ms)`);
console.log(
    `Most Resource-Consuming Method: ${mostMemory.method} (${mostMemory.memory} MB)`
);
