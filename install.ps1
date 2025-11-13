# Rayna Tours Installation Script (PowerShell)

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "Rayna Tours - Installation Script" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Navigating to project directory..." -ForegroundColor Yellow
Set-Location "d:\Elite Path"
Write-Host "✓ Current directory: $(Get-Location)" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Clearing any previous installations..." -ForegroundColor Yellow
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Write-Host "✓ Cleaned up old files" -ForegroundColor Green
Write-Host ""

Write-Host "Step 3: Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take 3-5 minutes on first run..." -ForegroundColor Cyan
Write-Host ""

npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠ Installation had issues. Trying with legacy peer deps..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
}

Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "✓ Installation Complete!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Yellow
Write-Host "npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Yellow
Write-Host ""
