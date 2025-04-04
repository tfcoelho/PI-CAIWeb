@echo off
powershell -NoExit -Command "npm run lint -- --fix; npm run serve"
