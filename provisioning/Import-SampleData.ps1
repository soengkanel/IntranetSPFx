<#
.SYNOPSIS
    Imports sample data into SharePoint lists for Bred Bank Cambodia Intranet

.DESCRIPTION
    This script populates SharePoint lists with sample data from JSON files.
    Run Provision-Lists.ps1 first to create the lists.

.PARAMETER SiteUrl
    The URL of the SharePoint site

.EXAMPLE
    .\Import-SampleData.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/intranet"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

$ScriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$DataPath = Join-Path $ScriptPath "data"

# Connect to SharePoint
Write-Host "Connecting to SharePoint site: $SiteUrl" -ForegroundColor Cyan
Write-Host "A browser window will open for authentication..." -ForegroundColor Gray
Connect-PnPOnline -Url $SiteUrl -UseWebLogin

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Importing Sample Data for Bred Bank Cambodia" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

# ============================================
# Import FAQ Data
# ============================================
Write-Host "Importing FAQ data..." -ForegroundColor Yellow

$faqData = Get-Content -Path (Join-Path $DataPath "FAQ-data.json") -Raw | ConvertFrom-Json

foreach ($item in $faqData) {
    Add-PnPListItem -List "FAQ" -Values @{
        "Title" = $item.Question.Substring(0, [Math]::Min(255, $item.Question.Length))
        "Question" = $item.Question
        "Answer" = $item.Answer
        "Category" = $item.Category
        "FAQOrder" = $item.Order
        "IsActive" = $item.IsActive
    } | Out-Null
    Write-Host "  Added: $($item.Question.Substring(0, [Math]::Min(50, $item.Question.Length)))..." -ForegroundColor Gray
}
Write-Host "  FAQ data imported: $($faqData.Count) items" -ForegroundColor Green

# ============================================
# Import HR Contacts Data
# ============================================
Write-Host "Importing HR Contacts data..." -ForegroundColor Yellow

$hrData = Get-Content -Path (Join-Path $DataPath "HRContacts-data.json") -Raw | ConvertFrom-Json

foreach ($item in $hrData) {
    Add-PnPListItem -List "HR Contacts" -Values @{
        "Title" = $item.FullName
        "FullName" = $item.FullName
        "JobTitle" = $item.JobTitle
        "Department" = $item.Department
        "Email" = $item.Email
        "Phone" = $item.Phone
        "Extension" = $item.Extension
        "ContactOrder" = $item.Order
        "IsActive" = $item.IsActive
    } | Out-Null
    Write-Host "  Added: $($item.FullName)" -ForegroundColor Gray
}
Write-Host "  HR Contacts data imported: $($hrData.Count) items" -ForegroundColor Green

# ============================================
# Import Tools Directory Data
# ============================================
Write-Host "Importing Tools Directory data..." -ForegroundColor Yellow

$toolsData = Get-Content -Path (Join-Path $DataPath "ToolsDirectory-data.json") -Raw | ConvertFrom-Json

foreach ($item in $toolsData) {
    try {
        # URL fields need "Url, Description" format
        $urlValue = "$($item.URL), $($item.ToolName)"

        Add-PnPListItem -List "Tools Directory" -Values @{
            "Title" = $item.ToolName
            "ToolName" = $item.ToolName
            "Description" = $item.Description
            "ToolURL" = $urlValue
            "Category" = $item.Category
            "IconName" = $item.IconName
            "ToolOrder" = $item.Order
            "IsActive" = $item.IsActive
            "AccessLevel" = $item.AccessLevel
        } | Out-Null
        Write-Host "  Added: $($item.ToolName)" -ForegroundColor Gray
    }
    catch {
        Write-Host "  Error adding $($item.ToolName): $_" -ForegroundColor Red
    }
}
Write-Host "  Tools Directory data imported: $($toolsData.Count) items" -ForegroundColor Green

# ============================================
# Import Quick Links Data
# ============================================
Write-Host "Importing Quick Links data..." -ForegroundColor Yellow

$linksData = Get-Content -Path (Join-Path $DataPath "QuickLinks-data.json") -Raw | ConvertFrom-Json

# Check which fields exist in the Quick Links list
Write-Host "  Checking Quick Links list fields..." -ForegroundColor Gray
$quickLinksFieldsToCheck = @("LinkTitle", "LinkURL", "IconName", "Category", "LinkOrder", "OpenInNewTab", "IsActive")
$existingFields = @{}
foreach ($fieldName in $quickLinksFieldsToCheck) {
    $field = Get-PnPField -List "Quick Links" -Identity $fieldName -ErrorAction SilentlyContinue
    $existingFields[$fieldName] = ($null -ne $field)
    if ($null -eq $field) {
        Write-Host "    Warning: Field '$fieldName' not found in Quick Links list" -ForegroundColor Yellow
    }
}

foreach ($item in $linksData) {
    try {
        # Start with required Title field
        $values = @{
            "Title" = $item.LinkTitle
        }

        # Add fields only if they exist in the list
        if ($existingFields["LinkTitle"]) {
            $values["LinkTitle"] = $item.LinkTitle
        }
        if ($existingFields["LinkURL"]) {
            # URL fields in PnP need special handling - pass as comma-separated "Url, Description"
            $values["LinkURL"] = "$($item.URL), $($item.LinkTitle)"
        }
        if ($existingFields["IconName"]) {
            $values["IconName"] = $item.IconName
        }
        if ($existingFields["Category"]) {
            $values["Category"] = $item.Category
        }
        if ($existingFields["LinkOrder"]) {
            $values["LinkOrder"] = $item.Order
        }
        if ($existingFields["OpenInNewTab"]) {
            $values["OpenInNewTab"] = $item.OpenInNewTab
        }
        if ($existingFields["IsActive"]) {
            $values["IsActive"] = $item.IsActive
        }

        # Use ErrorAction SilentlyContinue for the known non-blocking error
        # Items are added successfully despite the error about read-only fields
        Add-PnPListItem -List "Quick Links" -Values $values -ErrorAction SilentlyContinue | Out-Null
        Write-Host "  Added: $($item.LinkTitle)" -ForegroundColor Gray
    }
    catch {
        Write-Host "  Error adding $($item.LinkTitle): $_" -ForegroundColor Red
    }
}
Write-Host "  Quick Links data imported: $($linksData.Count) items" -ForegroundColor Green

# ============================================
# Import Products Data
# ============================================
Write-Host "Importing Products and Services data..." -ForegroundColor Yellow

$productsData = Get-Content -Path (Join-Path $DataPath "Products-data.json") -Raw | ConvertFrom-Json

# Check if ShortDescription field exists
$shortDescField = Get-PnPField -List "Products and Services" -Identity "ShortDescription" -ErrorAction SilentlyContinue
$hasShortDesc = $null -ne $shortDescField

if (-not $hasShortDesc) {
    Write-Host "  Note: ShortDescription field not found, skipping that field" -ForegroundColor Yellow
}

foreach ($item in $productsData) {
    try {
        $values = @{
            "Title" = $item.ProductName
            "ProductName" = $item.ProductName
            "Description" = $item.Description
            "Category" = $item.Category
            "Features" = $item.Features
            "IsActive" = $item.IsActive
            "IsFeatured" = $item.IsFeatured
            "ProductOrder" = $item.Order
        }

        # Only add ShortDescription if field exists
        if ($hasShortDesc -and $item.ShortDescription) {
            $values["ShortDescription"] = $item.ShortDescription
        }

        Add-PnPListItem -List "Products and Services" -Values $values | Out-Null
        Write-Host "  Added: $($item.ProductName)" -ForegroundColor Gray
    }
    catch {
        Write-Host "  Error adding $($item.ProductName): $_" -ForegroundColor Red
    }
}
Write-Host "  Products data imported: $($productsData.Count) items" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Sample data import completed!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  - FAQ: $($faqData.Count) items" -ForegroundColor White
Write-Host "  - HR Contacts: $($hrData.Count) items" -ForegroundColor White
Write-Host "  - Tools Directory: $($toolsData.Count) items" -ForegroundColor White
Write-Host "  - Quick Links: $($linksData.Count) items" -ForegroundColor White
Write-Host "  - Products: $($productsData.Count) items" -ForegroundColor White

Disconnect-PnPOnline
