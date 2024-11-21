import time
import tracemalloc

# Create an array of 1 million numbers
numbers = [i for i in range(1_000_000)]
results = []  # List to store execution times and memory usage


def measure_method(name, callback):
    """
    Measure the execution time and memory usage of a given method.
    """
    tracemalloc.start()  # Start tracking memory usage
    start_memory, _ = tracemalloc.get_traced_memory()  # Memory before
    start_time = time.perf_counter()  # Start time
    callback()  # Execute the function
    end_time = time.perf_counter()  # End time
    end_memory, _ = tracemalloc.get_traced_memory()  # Memory after
    tracemalloc.stop()  # Stop tracking memory usage

    memory_used = (end_memory - start_memory) / 1024 / 1024  # Convert bytes to MB
    results.append({
        "method": name,
        "time": (end_time - start_time) * 1000,  # Convert to milliseconds
        "memory": memory_used
    })


# 1. For Loop
measure_method("For Loop", lambda: [numbers[i] * 2 for i in range(len(numbers))])

# 2. ForEach (Equivalent in Python)
measure_method("Foreach Loop", lambda: [num * 2 for num in numbers])

# 3. While Loop
measure_method("While Loop", lambda: (
    (lambda: [numbers[i] * 2 for i in range(len(numbers))])()
))

# 4. Map Method
measure_method("Map Method", lambda: list(map(lambda num: num * 2, numbers)))

# 5. Filter Method
measure_method("Filter Method", lambda: list(filter(lambda num: num % 2 == 0, numbers)))

# 6. Reduce Method
from functools import reduce
measure_method("Reduce Method", lambda: reduce(lambda acc, num: acc + num, numbers, 0))

# Find the fastest and most resource-consuming methods
fastest = min(results, key=lambda x: x['time'])
most_memory = max(results, key=lambda x: x['memory'])

# Print Results
print("Execution Results:")
for result in results:
    print(f"{result['method']}: {result['time']:.2f} ms, {result['memory']:.2f} MB")

print(f"\nFastest Method: {fastest['method']} ({fastest['time']:.2f} ms)")
print(f"Most Resource-Consuming Method: {most_memory['method']} ({most_memory['memory']:.2f} MB)")
