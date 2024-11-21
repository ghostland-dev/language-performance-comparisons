use std::time::Instant;

fn main() {
    // Generate a vector of 1 million numbers
    let numbers: Vec<u64> = (0..1_000_000).collect(); // Changed to u64
    let mut results: Vec<Result> = Vec::new(); // Store results for each method

    // Measure each method
    measure_method("For Loop", || {
        let mut _result = Vec::with_capacity(numbers.len());
        for i in 0..numbers.len() {
            _result.push(numbers[i] * 2);
        }
    }, &mut results);

    measure_method("ForEach Loop", || {
        let mut _result = Vec::with_capacity(numbers.len());
        numbers.iter().for_each(|&num| {
            _result.push(num * 2);
        });
    }, &mut results);

    measure_method("While Loop", || {
        let mut _result = Vec::with_capacity(numbers.len());
        let mut i = 0;
        while i < numbers.len() {
            _result.push(numbers[i] * 2);
            i += 1;
        }
    }, &mut results);

    measure_method("Map Method", || {
        let _result: Vec<u64> = numbers.iter().map(|&num| num * 2).collect();
    }, &mut results);

    measure_method("Filter Method", || {
        let _result: Vec<u64> = numbers.iter().filter(|&&num| num % 2 == 0).cloned().collect();
    }, &mut results);

    measure_method("Reduce Method", || {
        let _sum: u64 = numbers.iter().fold(0, |acc, &num| acc + num); // Changed to u64
    }, &mut results);

    // Find the fastest and most resource-consuming methods
    let fastest = results.iter().min_by(|a, b| a.time.partial_cmp(&b.time).unwrap()).unwrap();
    let slowest = results.iter().max_by(|a, b| a.time.partial_cmp(&b.time).unwrap()).unwrap();

    // Print results
    println!("Execution Results:");
    for result in &results {
        println!("{}: {:.2} ms", result.method, result.time);
    }
    println!("\nFastest Method: {} ({:.2} ms)", fastest.method, fastest.time);
    println!("Slowest Method: {} ({:.2} ms)", slowest.method, slowest.time);
}

struct Result {
    method: &'static str,
    time: f64,
}

fn measure_method<F: FnOnce()>(name: &'static str, func: F, results: &mut Vec<Result>) {
    let start = Instant::now();
    func();
    let duration = start.elapsed();
    results.push(Result {
        method: name,
        time: duration.as_secs_f64() * 1000.0, // Convert to milliseconds
    });
}
