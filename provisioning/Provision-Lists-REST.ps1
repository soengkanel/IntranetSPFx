<#
.SYNOPSIS
    Provisions SharePoint lists using REST API (no extra modules required)

.DESCRIPTION
    Creates SharePoint lists for Bred Bank Cambodia Intranet using REST API.
    Uses browser-based authentication.

.PARAMETER SiteUrl
    The URL of the SharePoint site

.EXAMPLE
    .\Provision-Lists-REST.ps1 -SiteUrl "https://demo081225.sharepoint.com/sites/Demo"
#>

param(
    [Parameter(Mandatory=$true)]
    [string]$SiteUrl
)

# Remove trailing slash
$SiteUrl = $SiteUrl.TrimEnd('/')

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Bred Bank Cambodia - List Provisioning" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Site: $SiteUrl" -ForegroundColor Cyan
Write-Host ""

# Authenticate using browser
Write-Host "Opening browser for authentication..." -ForegroundColor Yellow
Write-Host "Please sign in and then press ENTER to continue..." -ForegroundColor Yellow

# Open the site in browser to establish auth cookies
Start-Process $SiteUrl
Read-Host "Press ENTER after signing in to the site"

# Create web session
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession

# Function to get request digest
function Get-RequestDigest {
    param($webSession)

    try {
        $contextInfoUrl = "$SiteUrl/_api/contextinfo"
        $response = Invoke-RestMethod -Uri $contextInfoUrl -Method Post -UseDefaultCredentials -SessionVariable webSession -ContentType "application/json;odata=verbose"
        return $response.d.GetContextWebInformation.FormDigestValue
    }
    catch {
        Write-Host "Error getting request digest: $_" -ForegroundColor Red
        return $null
    }
}

# Function to create a list
function New-SPList {
    param(
        [string]$ListTitle,
        [string]$Description
    )

    Write-Host "Creating list: $ListTitle..." -ForegroundColor Yellow

    $listUrl = "$SiteUrl/_api/web/lists"
    $body = @{
        '__metadata' = @{ 'type' = 'SP.List' }
        'Title' = $ListTitle
        'Description' = $Description
        'BaseTemplate' = 100
        'AllowContentTypes' = $true
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $listUrl -Method Post -UseDefaultCredentials -Body $body -ContentType "application/json;odata=verbose" -Headers @{"Accept"="application/json;odata=verbose"}
        Write-Host "  Created: $ListTitle" -ForegroundColor Green
        return $true
    }
    catch {
        if ($_.Exception.Response.StatusCode -eq 409) {
            Write-Host "  List already exists: $ListTitle" -ForegroundColor Gray
            return $true
        }
        Write-Host "  Error: $_" -ForegroundColor Red
        return $false
    }
}

# Function to add a field to a list
function Add-SPField {
    param(
        [string]$ListTitle,
        [string]$FieldXml
    )

    $fieldUrl = "$SiteUrl/_api/web/lists/getbytitle('$ListTitle')/fields/createfieldasxml"
    $body = @{
        'parameters' = @{
            '__metadata' = @{ 'type' = 'SP.XmlSchemaFieldCreationInformation' }
            'SchemaXml' = $FieldXml
        }
    } | ConvertTo-Json -Depth 3

    try {
        Invoke-RestMethod -Uri $fieldUrl -Method Post -UseDefaultCredentials -Body $body -ContentType "application/json;odata=verbose" -Headers @{"Accept"="application/json;odata=verbose"} | Out-Null
        return $true
    }
    catch {
        # Field may already exist
        return $false
    }
}

Write-Host ""
Write-Host "Creating lists..." -ForegroundColor Cyan
Write-Host ""

# ============================================
# 1. FAQ List
# ============================================
New-SPList -ListTitle "FAQ" -Description "Frequently Asked Questions"
Add-SPField -ListTitle "FAQ" -FieldXml '<Field Type="Text" DisplayName="Question" Name="Question" Required="TRUE" MaxLength="500"/>'
Add-SPField -ListTitle "FAQ" -FieldXml '<Field Type="Note" DisplayName="Answer" Name="Answer" Required="TRUE" RichText="TRUE" RichTextMode="FullHtml"/>'
Add-SPField -ListTitle "FAQ" -FieldXml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>General</CHOICE><CHOICE>HR</CHOICE><CHOICE>IT</CHOICE><CHOICE>Finance</CHOICE><CHOICE>Operations</CHOICE><CHOICE>Products</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "FAQ" -FieldXml '<Field Type="Number" DisplayName="Order" Name="FAQOrder"/>'
Add-SPField -ListTitle "FAQ" -FieldXml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>'
Write-Host "  Fields added to FAQ" -ForegroundColor Gray

# ============================================
# 2. Suggestions List
# ============================================
New-SPList -ListTitle "Suggestions" -Description "Employee Suggestions"
Add-SPField -ListTitle "Suggestions" -FieldXml '<Field Type="Text" DisplayName="SuggestionTitle" Name="SuggestionTitle" Required="TRUE"/>'
Add-SPField -ListTitle "Suggestions" -FieldXml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE"/>'
Add-SPField -ListTitle "Suggestions" -FieldXml '<Field Type="Choice" DisplayName="Status" Name="Status" Required="TRUE"><Default>Pending</Default><CHOICES><CHOICE>Pending</CHOICE><CHOICE>Under Review</CHOICE><CHOICE>Implemented</CHOICE><CHOICE>Rejected</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "Suggestions" -FieldXml '<Field Type="Note" DisplayName="AdminComments" Name="AdminComments"/>'
Write-Host "  Fields added to Suggestions" -ForegroundColor Gray

# ============================================
# 3. HR Contacts List
# ============================================
New-SPList -ListTitle "HR Contacts" -Description "HR Department Contacts"
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Text" DisplayName="FullName" Name="FullName" Required="TRUE"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Text" DisplayName="JobTitle" Name="JobTitle" Required="TRUE"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Choice" DisplayName="Department" Name="Department" Required="TRUE"><CHOICES><CHOICE>HR Management</CHOICE><CHOICE>Recruitment</CHOICE><CHOICE>Payroll and Benefits</CHOICE><CHOICE>Training and Development</CHOICE><CHOICE>Employee Relations</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Text" DisplayName="Email" Name="Email" Required="TRUE"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Text" DisplayName="Phone" Name="Phone"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Text" DisplayName="Extension" Name="Extension"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Number" DisplayName="Order" Name="ContactOrder"/>'
Add-SPField -ListTitle "HR Contacts" -FieldXml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>'
Write-Host "  Fields added to HR Contacts" -ForegroundColor Gray

# ============================================
# 4. Tools Directory List
# ============================================
New-SPList -ListTitle "Tools Directory" -Description "Internal Tools and Applications"
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Text" DisplayName="ToolName" Name="ToolName" Required="TRUE"/>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE"/>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="URL" DisplayName="URL" Name="ToolURL" Required="TRUE"/>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>Core Banking</CHOICE><CHOICE>HR Systems</CHOICE><CHOICE>IT Support</CHOICE><CHOICE>Finance</CHOICE><CHOICE>Communication</CHOICE><CHOICE>Documents</CHOICE><CHOICE>Learning</CHOICE><CHOICE>Reporting</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Text" DisplayName="IconName" Name="IconName"/>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Number" DisplayName="Order" Name="ToolOrder"/>'
Add-SPField -ListTitle "Tools Directory" -FieldXml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>'
Write-Host "  Fields added to Tools Directory" -ForegroundColor Gray

# ============================================
# 5. Quick Links List
# ============================================
New-SPList -ListTitle "Quick Links" -Description "Quick Access Links"
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Text" DisplayName="LinkTitle" Name="LinkTitle" Required="TRUE"/>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="URL" DisplayName="URL" Name="LinkURL" Required="TRUE"/>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Text" DisplayName="IconName" Name="IconName"/>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Choice" DisplayName="Category" Name="LinkCategory"><CHOICES><CHOICE>Home Page</CHOICE><CHOICE>HR Page</CHOICE><CHOICE>Finance Page</CHOICE><CHOICE>IT Page</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Number" DisplayName="Order" Name="LinkOrder" Required="TRUE"/>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Boolean" DisplayName="OpenInNewTab" Name="OpenInNewTab"/>'
Add-SPField -ListTitle "Quick Links" -FieldXml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>'
Write-Host "  Fields added to Quick Links" -ForegroundColor Gray

# ============================================
# 6. Products and Services List
# ============================================
New-SPList -ListTitle "Products and Services" -Description "Bank Products and Services"
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Text" DisplayName="ProductName" Name="ProductName" Required="TRUE"/>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE" RichText="TRUE" RichTextMode="FullHtml"/>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Note" DisplayName="ShortDescription" Name="ShortDescription"/>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>Personal Banking</CHOICE><CHOICE>Business Banking</CHOICE><CHOICE>Loans</CHOICE><CHOICE>Cards</CHOICE><CHOICE>Insurance</CHOICE><CHOICE>Investments</CHOICE><CHOICE>Digital Banking</CHOICE></CHOICES></Field>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Note" DisplayName="Features" Name="Features" RichText="TRUE" RichTextMode="FullHtml"/>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Boolean" DisplayName="IsFeatured" Name="IsFeatured"/>'
Add-SPField -ListTitle "Products and Services" -FieldXml '<Field Type="Number" DisplayName="Order" Name="ProductOrder"/>'
Write-Host "  Fields added to Products and Services" -ForegroundColor Gray

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "Provisioning Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Created lists:" -ForegroundColor Cyan
Write-Host "  - FAQ"
Write-Host "  - Suggestions"
Write-Host "  - HR Contacts"
Write-Host "  - Tools Directory"
Write-Host "  - Quick Links"
Write-Host "  - Products and Services"
Write-Host ""
Write-Host "Next: Run Import-SampleData-REST.ps1 to add sample data" -ForegroundColor Yellow
Write-Host ""
