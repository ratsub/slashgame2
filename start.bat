@echo off
setlocal
cd /d "%~dp0"
set "PORT=8080"
where py >nul 2>nul
if %errorlevel%==0 goto PY
where python >nul 2>nul
if %errorlevel%==0 goto PYTHON
where node >nul 2>nul
if %errorlevel%==0 goto NODE

echo.
echo Python または Node.js が見つかりません。
echo Python をインストールしてから、もう一度 start.bat を実行してください。
echo.
pause
exit /b 1

:PY
start "slash browser" http://127.0.0.1:%PORT%/
py -m http.server %PORT%
exit /b

:PYTHON
start "slash browser" http://127.0.0.1:%PORT%/
python -m http.server %PORT%
exit /b

:NODE
start "slash browser" http://127.0.0.1:%PORT%/
node server.js
exit /b
