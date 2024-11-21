const numbers = Array.from({ length: 1_000_000 }, (_, i) => i); // Create an array of 1 million numbers
const results = []; // Array to store execution times and memory usage

function getMemoryUsage() {
    if (performance.memory) {
        return performance.memory.usedJSHeapSize / 1024 / 1024; // Convert to MB
    }
    return null; // If the memory API is not supported
}

function measureMethod(name, callback) {
    const memoryBefore = getMemoryUsage();
    const start = performance.now();
    callback();
    const end = performance.now();
    const memoryAfter = getMemoryUsage();
    results.push({
        method: name,
        time: (end - start).toFixed(2),
        memory: memoryAfter !== null && memoryBefore !== null
            ? (memoryAfter - memoryBefore).toFixed(2)
            : "N/A"
    });
}

// For Loop
measureMethod("For Loop", () => {
    for (let i = 0; i < numbers.length; i++) {
        let x = numbers[i] * 2; // Example operation
    }
});

// Foreach Loop
measureMethod("Foreach Loop", () => {
    numbers.forEach(num => {
        let x = num * 2; // Example operation
    });
});

// While Loop
measureMethod("While Loop", () => {
    let i = 0;
    while (i < numbers.length) {
        let x = numbers[i] * 2; // Example operation
        i++;
    }
});

// Do-While Loop
measureMethod("Do-While Loop", () => {
    let i = 0;
    do {
        let x = numbers[i] * 2; // Example operation
        i++;
    } while (i < numbers.length);
});

// Map Method
measureMethod("Map Method", () => {
    const doubledNumbers = numbers.map(num => num * 2);
});

// Filter Method
measureMethod("Filter Method", () => {
    const evenNumbers = numbers.filter(num => num % 2 === 0);
});

// Reduce Method
measureMethod("Reduce Method", () => {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
});

// Find fastest and most memory-consuming methods
const fastest = results.reduce((a, b) => (parseFloat(a.time) < parseFloat(b.time) ? a : b));
const slowest = results.reduce((a, b) => (parseFloat(a.time) > parseFloat(b.time) ? a : b));
const mostMemory = results.reduce((a, b) => (parseFloat(a.memory) > parseFloat(b.memory) ? a : b));

// Print Results
console.table(results);
console.log(`Fastest Method: ${fastest.method} (${fastest.time} ms)`);
console.log(`Most Resource-Consuming Method (Memory): ${mostMemory.method} (${mostMemory.memory} MB)`);
