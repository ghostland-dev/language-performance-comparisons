// Results array to store each method's performance data
var results = [];
/**
 * Measures the execution time and memory usage of a given method.
 *
 * @param name - The name of the method being tested.
 * @param callback - The function representing the method's logic.
 */
function measureMethod(name, callback) {
    // Record memory usage before execution
    var memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;
    // Start timing the execution
    var start = performance.now();
    // Execute the callback
    callback();
    // Stop timing the execution
    var end = performance.now();
    // Record memory usage after execution
    var memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;
    // Store the result
    results.push({
        method: name,
        time: parseFloat((end - start).toFixed(2)),
        memory: parseFloat((memoryAfter - memoryBefore).toFixed(2)),
    });
}
// Generate an array of 1 million numbers
var numbers = Array.from({ length: 1000000 }, function (_, i) { return i; });
// 1. For Loop
measureMethod("For Loop", function () {
    var result = [];
    for (var i = 0; i < numbers.length; i++) {
        result.push(numbers[i] * 2);
    }
});
// 2. ForEach Loop
measureMethod("ForEach Loop", function () {
    var result = [];
    numbers.forEach(function (num) {
        result.push(num * 2);
    });
});
// 3. While Loop
measureMethod("While Loop", function () {
    var result = [];
    var i = 0;
    while (i < numbers.length) {
        result.push(numbers[i] * 2);
        i++;
    }
});
// 4. Map Method
measureMethod("Map Method", function () {
    var result = numbers.map(function (num) { return num * 2; });
});
// 5. Filter Method
measureMethod("Filter Method", function () {
    var result = numbers.filter(function (num) { return num % 2 === 0; });
});
// 6. Reduce Method
measureMethod("Reduce Method", function () {
    var sum = numbers.reduce(function (acc, num) { return acc + num; }, 0);
});
// Find the fastest and most memory-consuming methods
var fastest = results.reduce(function (a, b) { return (a.time < b.time ? a : b); });
var mostMemory = results.reduce(function (a, b) { return (a.memory > b.memory ? a : b); });
// Print results
console.log("Execution Results:");
results.forEach(function (result) {
    return console.log("".concat(result.method, ": ").concat(result.time, " ms, ").concat(result.memory, " MB"));
});
console.log("\nFastest Method: ".concat(fastest.method, " (").concat(fastest.time, " ms)"));
console.log("Most Resource-Consuming Method: ".concat(mostMemory.method, " (").concat(mostMemory.memory, " MB)"));
