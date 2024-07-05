#!/bin/bash
# navigate to root of git repo
cd "$(git rev-parse --show-toplevel)"

git status

read -p "Enter your commit message: " commitMessage
# Check if the user entered a message
if [[ -z "$commitMessage" ]]; then
  echo "Error: Please enter a commit message."
  exit 1
fi

git add .

git commit -m "$commitMessage"

git push

echo "Committed and Pushed to Git"