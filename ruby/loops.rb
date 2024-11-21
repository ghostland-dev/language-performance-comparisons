require 'benchmark'
require 'objspace'

# Create an array of 1 million numbers
numbers = (0...1_000_000).to_a
results = [] # Array to store execution times and memory usage

def measure_method(name)
  # Measure memory before
  memory_before = ObjectSpace.memsize_of_all

  # Measure time and execute the callback
  time = Benchmark.realtime do
    yield
  end

  # Measure memory after
  memory_after = ObjectSpace.memsize_of_all

  # Calculate memory difference
  memory_used = (memory_after - memory_before) / (1024.0 * 1024.0) # Convert to MB

  # Store the results
  {
    method: name,
    time: (time * 1000).round(2), # Convert to milliseconds
    memory: memory_used.round(2)
  }
end

# 1. For Loop
results << measure_method("For Loop") do
  result = []
  for i in 0...numbers.size
    result << numbers[i] * 2
  end
end

# 2. Each Loop
results << measure_method("Each Loop") do
  result = []
  numbers.each do |num|
    result << num * 2
  end
end

# 3. While Loop
results << measure_method("While Loop") do
  result = []
  i = 0
  while i < numbers.size
    result << numbers[i] * 2
    i += 1
  end
end

# 4. Map Method
results << measure_method("Map Method") do
  result = numbers.map { |num| num * 2 }
end

# 5. Select Method (Filter Equivalent)
results << measure_method("Select Method") do
  result = numbers.select { |num| num.even? }
end

# 6. Reduce Method
results << measure_method("Reduce Method") do
  result = numbers.reduce(0) { |acc, num| acc + num }
end

# Find the fastest and most memory-consuming methods
fastest = results.min_by { |r| r[:time] }
most_memory = results.max_by { |r| r[:memory] }

# Print Results
puts "Execution Results:"
results.each do |result|
  puts "#{result[:method]}: #{result[:time]} ms, #{result[:memory]} MB"
end

puts "\nFastest Method: #{fastest[:method]} (#{fastest[:time]} ms)"
puts "Most Resource-Consuming Method: #{most_memory[:method]} (#{most_memory[:memory]} MB)"
