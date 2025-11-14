# Quick push script for PowerShell
# Usage: .\push.ps1 "your commit message"

param(
    [string]$message = "Update"
)

Write-Host "🔄 Adding all changes..." -ForegroundColor Cyan
git add -A

Write-Host "📝 Committing with message: '$message'" -ForegroundColor Cyan
git commit -m $message

Write-Host "🚀 Pushing to GitHub (Vercel will auto-deploy)..." -ForegroundColor Cyan
git push origin main

Write-Host "✅ Done! Check Vercel dashboard at https://vercel.com/dashboard" -ForegroundColor Green
