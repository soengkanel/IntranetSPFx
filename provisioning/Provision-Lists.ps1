<#
.SYNOPSIS
    Provisions SharePoint lists for Bred Bank Cambodia Intranet

.DESCRIPTION
    This script creates all required SharePoint lists and populates them with sample data.
    Requires PnP PowerShell module: Install-Module PnP.PowerShell

.PARAMETER SiteUrl
    The URL of the SharePoint site where lists will be created

.EXAMPLE
    .\Provision-Lists.ps1 -SiteUrl "https://contoso.sharepoint.com/sites/intranet"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

# Connect to SharePoint
Write-Host "Connecting to SharePoint site: $SiteUrl" -ForegroundColor Cyan
Write-Host "A browser window will open for authentication..." -ForegroundColor Gray
Connect-PnPOnline -Url $SiteUrl -UseWebLogin

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Bred Bank Cambodia Intranet Provisioning" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

# ============================================
# 1. FAQ List
# ============================================
Write-Host "Creating FAQ list..." -ForegroundColor Yellow

$faqList = Get-PnPList -Identity "FAQ" -ErrorAction SilentlyContinue
if ($null -eq $faqList) {
    New-PnPList -Title "FAQ" -Template GenericList

    Add-PnPField -List "FAQ" -DisplayName "Question" -InternalName "Question" -Type Text -Required
    Add-PnPField -List "FAQ" -DisplayName "Answer" -InternalName "Answer" -Type Note -Required
    Add-PnPField -List "FAQ" -DisplayName "Category" -InternalName "Category" -Type Choice -Choices "General","HR","IT","Finance","Operations","Products" -Required
    Add-PnPField -List "FAQ" -DisplayName "Order" -InternalName "FAQOrder" -Type Number
    Add-PnPField -List "FAQ" -DisplayName "IsActive" -InternalName "IsActive" -Type Boolean

    Write-Host "  FAQ list created successfully" -ForegroundColor Green
} else {
    Write-Host "  FAQ list already exists, skipping..." -ForegroundColor Gray
}

# ============================================
# 2. Suggestions List
# ============================================
Write-Host "Creating Suggestions list..." -ForegroundColor Yellow

$suggestionsList = Get-PnPList -Identity "Suggestions" -ErrorAction SilentlyContinue
if ($null -eq $suggestionsList) {
    New-PnPList -Title "Suggestions" -Template GenericList

    Add-PnPField -List "Suggestions" -DisplayName "Suggestion Title" -InternalName "SuggestionTitle" -Type Text -Required
    Add-PnPField -List "Suggestions" -DisplayName "Description" -InternalName "Description" -Type Note -Required
    Add-PnPField -List "Suggestions" -DisplayName "Submitted By" -InternalName "SubmittedBy" -Type User
    Add-PnPField -List "Suggestions" -DisplayName "Submitted Date" -InternalName "SubmittedDate" -Type DateTime
    Add-PnPField -List "Suggestions" -DisplayName "Status" -InternalName "Status" -Type Choice -Choices "Pending","Under Review","Implemented","Rejected" -Required
    Add-PnPField -List "Suggestions" -DisplayName "Admin Comments" -InternalName "AdminComments" -Type Note
    Add-PnPField -List "Suggestions" -DisplayName "Category" -InternalName "Category" -Type Choice -Choices "Process Improvement","Technology","Workplace","Benefits","Training","Other"

    Write-Host "  Suggestions list created successfully" -ForegroundColor Green
} else {
    Write-Host "  Suggestions list already exists, skipping..." -ForegroundColor Gray
}

# ============================================
# 3. HR Contacts List
# ============================================
Write-Host "Creating HR Contacts list..." -ForegroundColor Yellow

$hrContactsList = Get-PnPList -Identity "HR Contacts" -ErrorAction SilentlyContinue
if ($null -eq $hrContactsList) {
    New-PnPList -Title "HR Contacts" -Template GenericList

    Add-PnPField -List "HR Contacts" -DisplayName "Full Name" -InternalName "FullName" -Type Text -Required
    Add-PnPField -List "HR Contacts" -DisplayName "Job Title" -InternalName "JobTitle" -Type Text -Required
    Add-PnPField -List "HR Contacts" -DisplayName "Department" -InternalName "Department" -Type Choice -Choices "HR Management","Recruitment","Payroll & Benefits","Training & Development","Employee Relations" -Required
    Add-PnPField -List "HR Contacts" -DisplayName "Email" -InternalName "Email" -Type Text -Required
    Add-PnPField -List "HR Contacts" -DisplayName "Phone" -InternalName "Phone" -Type Text
    Add-PnPField -List "HR Contacts" -DisplayName "Extension" -InternalName "Extension" -Type Text
    Add-PnPField -List "HR Contacts" -DisplayName "Photo URL" -InternalName "PhotoUrl" -Type URL
    Add-PnPField -List "HR Contacts" -DisplayName "Order" -InternalName "ContactOrder" -Type Number
    Add-PnPField -List "HR Contacts" -DisplayName "IsActive" -InternalName "IsActive" -Type Boolean

    Write-Host "  HR Contacts list created successfully" -ForegroundColor Green
} else {
    Write-Host "  HR Contacts list already exists, skipping..." -ForegroundColor Gray
}

# ============================================
# 4. Tools Directory List
# ============================================
Write-Host "Creating Tools Directory list..." -ForegroundColor Yellow

$toolsList = Get-PnPList -Identity "Tools Directory" -ErrorAction SilentlyContinue
if ($null -eq $toolsList) {
    New-PnPList -Title "Tools Directory" -Template GenericList

    Add-PnPField -List "Tools Directory" -DisplayName "Tool Name" -InternalName "ToolName" -Type Text -Required
    Add-PnPField -List "Tools Directory" -DisplayName "Description" -InternalName "Description" -Type Note -Required
    Add-PnPField -List "Tools Directory" -DisplayName "URL" -InternalName "ToolURL" -Type URL -Required
    Add-PnPField -List "Tools Directory" -DisplayName "Category" -InternalName "Category" -Type Choice -Choices "Core Banking","HR Systems","IT Support","Finance","Communication","Documents","Learning","Reporting" -Required
    Add-PnPField -List "Tools Directory" -DisplayName "Icon Name" -InternalName "IconName" -Type Text
    Add-PnPField -List "Tools Directory" -DisplayName "Order" -InternalName "ToolOrder" -Type Number
    Add-PnPField -List "Tools Directory" -DisplayName "IsActive" -InternalName "IsActive" -Type Boolean
    Add-PnPField -List "Tools Directory" -DisplayName "Access Level" -InternalName "AccessLevel" -Type Choice -Choices "All Staff","Management","IT Only","HR Only","Finance Only"

    Write-Host "  Tools Directory list created successfully" -ForegroundColor Green
} else {
    Write-Host "  Tools Directory list already exists, skipping..." -ForegroundColor Gray
}

# ============================================
# 5. Quick Links List
# ============================================
Write-Host "Creating Quick Links list..." -ForegroundColor Yellow

$linksList = Get-PnPList -Identity "Quick Links" -ErrorAction SilentlyContinue
if ($null -eq $linksList) {
    New-PnPList -Title "Quick Links" -Template GenericList
    Write-Host "  Quick Links list created" -ForegroundColor Green
} else {
    Write-Host "  Quick Links list already exists" -ForegroundColor Gray
}

# Add fields (will skip if they already exist)
Write-Host "  Adding fields to Quick Links..." -ForegroundColor Gray
$quickLinksFields = @(
    @{ DisplayName = "Link Title"; InternalName = "LinkTitle"; Type = "Text"; Required = $true },
    @{ DisplayName = "URL"; InternalName = "LinkURL"; Type = "URL"; Required = $true },
    @{ DisplayName = "Icon Name"; InternalName = "IconName"; Type = "Text"; Required = $false },
    @{ DisplayName = "Category"; InternalName = "Category"; Type = "Choice"; Required = $false; Choices = @("Home Page","HR Page","Finance Page","IT Page") },
    @{ DisplayName = "Order"; InternalName = "LinkOrder"; Type = "Number"; Required = $true },
    @{ DisplayName = "Open In New Tab"; InternalName = "OpenInNewTab"; Type = "Boolean"; Required = $false },
    @{ DisplayName = "IsActive"; InternalName = "IsActive"; Type = "Boolean"; Required = $false }
)

foreach ($field in $quickLinksFields) {
    $existingField = Get-PnPField -List "Quick Links" -Identity $field.InternalName -ErrorAction SilentlyContinue
    if ($null -eq $existingField) {
        $params = @{
            List = "Quick Links"
            DisplayName = $field.DisplayName
            InternalName = $field.InternalName
            Type = $field.Type
        }
        if ($field.Required) { $params.Required = $true }
        if ($field.Choices) { $params.Choices = $field.Choices }

        Add-PnPField @params | Out-Null
        Write-Host "    Added field: $($field.DisplayName)" -ForegroundColor Gray
    }
}
Write-Host "  Quick Links list ready" -ForegroundColor Green

# ============================================
# 6. Products and Services List
# ============================================
Write-Host "Creating Products and Services list..." -ForegroundColor Yellow

$productsList = Get-PnPList -Identity "Products and Services" -ErrorAction SilentlyContinue
if ($null -eq $productsList) {
    New-PnPList -Title "Products and Services" -Template GenericList
    Write-Host "  Products and Services list created" -ForegroundColor Green
} else {
    Write-Host "  Products and Services list already exists" -ForegroundColor Gray
}

# Add fields (will skip if they already exist)
Write-Host "  Adding fields to Products and Services..." -ForegroundColor Gray
$productsFields = @(
    @{ DisplayName = "Product Name"; InternalName = "ProductName"; Type = "Text"; Required = $true },
    @{ DisplayName = "Description"; InternalName = "Description"; Type = "Note"; Required = $true },
    @{ DisplayName = "Short Description"; InternalName = "ShortDescription"; Type = "Note"; Required = $false },
    @{ DisplayName = "Category"; InternalName = "Category"; Type = "Choice"; Required = $true; Choices = @("Personal Banking","Business Banking","Loans","Cards","Insurance","Investments","Digital Banking") },
    @{ DisplayName = "Features"; InternalName = "Features"; Type = "Note"; Required = $false },
    @{ DisplayName = "Image URL"; InternalName = "ImageUrl"; Type = "URL"; Required = $false },
    @{ DisplayName = "Document URL"; InternalName = "DocumentUrl"; Type = "URL"; Required = $false },
    @{ DisplayName = "IsActive"; InternalName = "IsActive"; Type = "Boolean"; Required = $false },
    @{ DisplayName = "IsFeatured"; InternalName = "IsFeatured"; Type = "Boolean"; Required = $false },
    @{ DisplayName = "Order"; InternalName = "ProductOrder"; Type = "Number"; Required = $false }
)

foreach ($field in $productsFields) {
    $existingField = Get-PnPField -List "Products and Services" -Identity $field.InternalName -ErrorAction SilentlyContinue
    if ($null -eq $existingField) {
        $params = @{
            List = "Products and Services"
            DisplayName = $field.DisplayName
            InternalName = $field.InternalName
            Type = $field.Type
        }
        if ($field.Required) { $params.Required = $true }
        if ($field.Choices) { $params.Choices = $field.Choices }

        Add-PnPField @params | Out-Null
        Write-Host "    Added field: $($field.DisplayName)" -ForegroundColor Gray
    }
}
Write-Host "  Products and Services list ready" -ForegroundColor Green

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "All lists created successfully!" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Green

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run Import-SampleData.ps1 to populate lists with sample data" -ForegroundColor White
Write-Host "2. Configure Site Pages library for news content" -ForegroundColor White
Write-Host "3. Set up content approval workflows" -ForegroundColor White

Disconnect-PnPOnline
