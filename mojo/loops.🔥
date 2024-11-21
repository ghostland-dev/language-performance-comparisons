import time

# Define a structure to store results
struct Result:
    method: str
    time: Float64  # Execution time in milliseconds

# Function to measure execution time
fn measure_method(name: str, callback: fn() -> None, results: inout [Result]):
    start = time.time()  # Start time
    callback()           # Execute the callback
    end = time.time()    # End time
    elapsed = (end - start) * 1000.0  # Convert to milliseconds

    # Append result to results array
    results.append(Result(method=name, time=elapsed))

# Main program
fn main():
    # Create an array of 1 million numbers
    numbers: [Int] = [i for i in range(1_000_000)]

    # Array to store results
    results: [Result] = []

    # 1. For Loop
    measure_method("For Loop", fn():
        result: [Int] = []
        for i in range(len(numbers)):
            result.append(numbers[i] * 2)
    , results)

    # 2. ForEach Loop
    measure_method("ForEach Loop", fn():
        result: [Int] = []
        for num in numbers:
            result.append(num * 2)
    , results)

    # 3. While Loop
    measure_method("While Loop", fn():
        result: [Int] = []
        i: Int = 0
        while i < len(numbers):
            result.append(numbers[i] * 2)
            i += 1
    , results)

    # 4. Map Method
    measure_method("Map Method", fn():
        result: [Int] = [num * 2 for num in numbers]
    , results)

    # 5. Filter Method
    measure_method("Filter Method", fn():
        result: [Int] = [num for num in numbers if num % 2 == 0]
    , results)

    # 6. Reduce Method
    measure_method("Reduce Method", fn():
        sum: Int = 0
        for num in numbers:
            sum += num
    , results)

    # Print results
    print("Execution Results:")
    for result in results:
        print(f"{result.method}: {result.time:.2f} ms")

    # Find the fastest method
    fastest = min(results, key=lambda x: x.time)
    print(f"\nFastest Method: {fastest.method} ({fastest.time:.2f} ms)")
