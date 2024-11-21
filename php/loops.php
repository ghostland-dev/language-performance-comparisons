<?php

// Generate an array of 1 million numbers
$numbers = range(0, 999999);
$results = []; // Array to store execution times and memory usage

/**
 * Measure the execution time and memory usage of a given callback.
 */
function measureMethod($name, $callback) {
    global $results;

    // Record initial memory usage and time
    $memoryBefore = memory_get_usage();
    $start = microtime(true);

    // Execute the callback
    $callback();

    // Record final memory usage and time
    $end = microtime(true);
    $memoryAfter = memory_get_usage();

    // Calculate memory usage and execution time
    $results[] = [
        'method' => $name,
        'time' => round(($end - $start) * 1000, 2), // Convert to milliseconds
        'memory' => round(($memoryAfter - $memoryBefore) / 1024 / 1024, 2) // Convert to MB
    ];
}

// 1. For Loop
measureMethod("For Loop", function() use ($numbers) {
    $result = [];
    for ($i = 0; $i < count($numbers); $i++) {
        $result[] = $numbers[$i] * 2;
    }
});

// 2. Foreach Loop
measureMethod("Foreach Loop", function() use ($numbers) {
    $result = [];
    foreach ($numbers as $num) {
        $result[] = $num * 2;
    }
});

// 3. While Loop
measureMethod("While Loop", function() use ($numbers) {
    $result = [];
    $i = 0;
    while ($i < count($numbers)) {
        $result[] = $numbers[$i] * 2;
        $i++;
    }
});

// 4. Map Method (array_map)
measureMethod("Map Method", function() use ($numbers) {
    $result = array_map(fn($num) => $num * 2, $numbers);
});

// 5. Filter Method (array_filter)
measureMethod("Filter Method", function() use ($numbers) {
    $result = array_filter($numbers, fn($num) => $num % 2 === 0);
});

// 6. Reduce Method (array_reduce)
measureMethod("Reduce Method", function() use ($numbers) {
    $result = array_reduce($numbers, fn($carry, $num) => $carry + $num, 0);
});

// Find the fastest and most memory-consuming methods
$fastest = array_reduce($results, fn($a, $b) => ($a['time'] < $b['time']) ? $a : $b);
$mostMemory = array_reduce($results, fn($a, $b) => ($a['memory'] > $b['memory']) ? $a : $b);

// Print Results
echo "Execution Results:\n";
foreach ($results as $result) {
    echo "{$result['method']}: {$result['time']} ms, {$result['memory']} MB\n";
}

echo "\nFastest Method: {$fastest['method']} ({$fastest['time']} ms)\n";
echo "Most Resource-Consuming Method: {$mostMemory['method']} ({$mostMemory['memory']} MB)\n";
