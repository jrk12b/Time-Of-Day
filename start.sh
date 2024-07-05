#!/bin/bash
cd "$(git rev-parse --show-toplevel)"
cd backend && node server.js &
cd frontend && npm start
