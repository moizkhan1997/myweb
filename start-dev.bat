@echo off
echo Starting Trimmic CMS Server...
start "Trimmic CMS" cmd /k "cd /d %~dp0 && node cms-server/server.mjs"
timeout /t 2 /nobreak > nul
echo Starting Vite Dev Server...
set PORT=5173
set BASE_PATH=/
pnpm dev
