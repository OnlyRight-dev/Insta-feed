@echo off
echo ========================================
echo   Avvio server HTTP locale...
echo ========================================
echo.
echo Il server sara' disponibile su:
echo   http://localhost:8000
echo.
echo Premi CTRL+C per fermare il server
echo.
echo ========================================
echo.

python -m http.server 8000

pause

