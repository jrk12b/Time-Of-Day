#!/bin/bash

# Define the command to be executed
command_3000="lsof -i :3000"
command_8000="lsof -i :8000"

# Execute the command and capture the output
output_3000=$(eval "$command_3000")
output_=8000=$(eval "$command_8000")

# Extract the PID using grep and cut
pid_3000=$(echo "$output_3000" | grep 'node' | awk '{print $2}')
pid_8000=$(echo "$output_" | grep 'node' | awk '{print $2}')

echo "Extracted PID 3000: $pid_3000"
echo "Extracted PID 8000: $pid_8000"

echo "Killing $pid_3000"
echo "Killing $pid_8000"

kill $pid_3000
kill $pid_8000
