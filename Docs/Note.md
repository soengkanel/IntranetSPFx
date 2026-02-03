Your PnP PowerShell version may be outdated. Let's check and fix:

  Step 1: Check your version

  Get-Module PnP.PowerShell -ListAvailable

  Step 2: Update to latest version

  # Uninstall old version
  Uninstall-Module PnP.PowerShell -AllVersions -Force

  # Install latest version
  Install-Module PnP.PowerShell -Scope CurrentUser -Force

  # Close and reopen PowerShell

  Step 3: Try connecting again

  After reopening PowerShell:

  Connect-PnPOnline -Url "https://demo081225.sharepoint.com/sites/Demo" -DeviceLogin

  ---
  Or try these alternatives with your current version:

  # Option A: Web Login
  Connect-PnPOnline -Url "https://demo081225.sharepoint.com/sites/Demo" -UseWebLogin

  # Option B: Credentials
  $cred = Get-Credential
  Connect-PnPOnline -Url "https://demo081225.sharepoint.com/sites/Demo" -Credentials $cred

  Which one works? Let me know the result.

❯  Connect-PnPOnline -Url "https://demo081225.sharepoint.com/sites/Demo" -UseWebLogin this work for me

● Now run the provisioning script:

  cd C:\Coding\REDBRIDGE\IntranetSPFX\provisioning
  .\Provision-Lists.ps1 -SiteUrl "https://demo081225.sharepoint.com/sites/Demo"

  This will create all 6 lists:
  - FAQ
  - Suggestions
  - HR Contacts
  - Tools Directory
  - Quick Links
  - Products and Services

  Let me know when it completes, then we'll import the sample data.