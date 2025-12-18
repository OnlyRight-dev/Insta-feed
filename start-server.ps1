Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Avvio server HTTP locale..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Il server sara' disponibile su:" -ForegroundColor Yellow
Write-Host "  http://localhost:8000" -ForegroundColor Green
Write-Host ""
Write-Host "Premi CTRL+C per fermare il server" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Prova prima con Python
try {
    python -m http.server 8000
} catch {
    # Se Python non funziona, prova con Node.js
    try {
        Write-Host "Python non trovato, provo con Node.js..." -ForegroundColor Yellow
        npx -y http-server -p 8000
    } catch {
        Write-Host "Errore: Python o Node.js non trovati!" -ForegroundColor Red
        Write-Host "Installa Python da https://www.python.org/downloads/" -ForegroundColor Yellow
        Write-Host "oppure Node.js da https://nodejs.org/" -ForegroundColor Yellow
        pause
    }
}

