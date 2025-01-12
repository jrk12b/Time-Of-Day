# For the frontend app (served from the 'build' directory)
web: if [ "$APP_TYPE" == "frontend" ]; then serve -s build; fi
# For the backend app (Node.js backend)
backend: if [ "$APP_TYPE" == "backend" ]; then node ./backend/server.js; fi
