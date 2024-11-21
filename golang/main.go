package main

import (
	"fmt"
	"runtime"
	"time"
)

// Result struct to store method performance data
type Result struct {
	Method string
	Time   float64 // Time in milliseconds
	Memory float64 // Memory usage in MB
}

func main() {
	// Generate a slice of 1 million numbers
	numbers := make([]int, 1_000_000)
	for i := 0; i < 1_000_000; i++ {
		numbers[i] = i
	}

	// Store the results
	results := []Result{}

	// Measure For Loop
	measureMethod("For Loop", func() {
		result := make([]int, 0, len(numbers))
		for i := 0; i < len(numbers); i++ {
			result = append(result, numbers[i]*2)
		}
	}, &results)

	// Measure ForEach Loop
	measureMethod("ForEach Loop", func() {
		result := make([]int, 0, len(numbers))
		for _, num := range numbers {
			result = append(result, num*2)
		}
	}, &results)

	// Measure While Loop (simulated with for)
	measureMethod("While Loop", func() {
		result := make([]int, 0, len(numbers))
		i := 0
		for i < len(numbers) {
			result = append(result, numbers[i]*2)
			i++
		}
	}, &results)

	// Measure Map Method
	measureMethod("Map Method", func() {
		result := make([]int, len(numbers))
		for i, num := range numbers {
			result[i] = num * 2
		}
	}, &results)

	// Measure Filter Method
	measureMethod("Filter Method", func() {
		result := make([]int, 0)
		for _, num := range numbers {
			if num%2 == 0 {
				result = append(result, num)
			}
		}
	}, &results)

	// Measure Reduce Method
	measureMethod("Reduce Method", func() {
		sum := 0
		for _, num := range numbers {
			sum += num
		}
	}, &results)

	// Print results
	fmt.Println("Execution Results:")
	for _, result := range results {
		fmt.Printf("%s: %.2f ms, %.2f MB\n", result.Method, result.Time, result.Memory)
	}

	// Find fastest and most memory-consuming methods
	fastest := results[0]
	mostMemory := results[0]
	for _, result := range results {
		if result.Time < fastest.Time {
			fastest = result
		}
		if result.Memory > mostMemory.Memory {
			mostMemory = result
		}
	}

	fmt.Printf("\nFastest Method: %s (%.2f ms)\n", fastest.Method, fastest.Time)
	fmt.Printf("Most Resource-Consuming Method: %s (%.2f MB)\n", mostMemory.Method, mostMemory.Memory)
}

// measureMethod calculates execution time and memory usage of a given method
func measureMethod(name string, callback func(), results *[]Result) {
	// Record memory usage before execution
	var memStatsBefore runtime.MemStats
	runtime.ReadMemStats(&memStatsBefore)

	// Start the timer
	start := time.Now()

	// Execute the callback
	callback()

	// Stop the timer
	elapsed := time.Since(start).Seconds() * 1000 // Convert to milliseconds

	// Record memory usage after execution
	var memStatsAfter runtime.MemStats
	runtime.ReadMemStats(&memStatsAfter)

	// Calculate memory usage in MB
	memoryUsage := float64(memStatsAfter.Alloc-memStatsBefore.Alloc) / (1024 * 1024)

	// Store the result
	*results = append(*results, Result{
		Method: name,
		Time:   elapsed,
		Memory: memoryUsage,
	})
}
