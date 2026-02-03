# SharePoint Provisioning for Bred Bank Cambodia Intranet

This folder contains scripts and data files to provision SharePoint lists and populate them with sample data.

## Prerequisites

1. **PnP PowerShell Module**
   ```powershell
   Install-Module PnP.PowerShell -Scope CurrentUser
   ```

2. **SharePoint Admin Access**
   - You need Site Owner or Admin permissions on the target site

## Folder Structure

```
provisioning/
├── lists/                    # List schema definitions (JSON)
│   ├── FAQ.json
│   ├── Suggestions.json
│   ├── HRContacts.json
│   ├── ToolsDirectory.json
│   ├── QuickLinks.json
│   └── Products.json
├── data/                     # Sample data files
│   ├── FAQ-data.json
│   ├── HRContacts-data.json
│   ├── ToolsDirectory-data.json
│   ├── QuickLinks-data.json
│   ├── Products-data.json
│   └── News-SamplePages.json
├── Provision-Lists.ps1       # Creates SharePoint lists
├── Import-SampleData.ps1     # Imports sample data
└── README.md
```

## Usage

### Step 1: Create Lists

```powershell
cd provisioning
.\Provision-Lists.ps1 -SiteUrl "https://yourtenant.sharepoint.com/sites/intranet"
```

This creates the following lists:
- FAQ
- Suggestions
- HR Contacts
- Tools Directory
- Quick Links
- Products and Services

### Step 2: Import Sample Data

```powershell
.\Import-SampleData.ps1 -SiteUrl "https://yourtenant.sharepoint.com/sites/intranet"
```

This populates the lists with sample data for Bred Bank Cambodia.

## Lists Overview

| List | Purpose | Items |
|------|---------|-------|
| FAQ | Frequently Asked Questions | 10 |
| HR Contacts | HR department contacts | 10 |
| Tools Directory | Internal applications | 12 |
| Quick Links | Navigation shortcuts | 12 |
| Products and Services | Product catalog | 12 |
| Suggestions | Employee feedback | 0 (user-generated) |

## News Content

News articles are stored in the **Site Pages** library. Sample news articles are defined in `data/News-SamplePages.json` but must be created manually or via a separate script as SharePoint pages.

### Creating News Pages

1. Go to Site Pages library
2. Create a new News Post
3. Add required metadata:
   - **Category** (Announcement, Event, Product, CSR, Financial, HR, IT)
   - **IsHeadline** (Yes/No)

## Customizing Data

Edit the JSON files in the `data/` folder to customize:
- Company name
- Contact information
- Product details
- Tool URLs
- FAQ content

## Column Reference

### FAQ List
| Column | Type | Required |
|--------|------|----------|
| Question | Text | Yes |
| Answer | Rich Text | Yes |
| Category | Choice | Yes |
| Order | Number | No |
| IsActive | Yes/No | No |

### HR Contacts List
| Column | Type | Required |
|--------|------|----------|
| FullName | Text | Yes |
| JobTitle | Text | Yes |
| Department | Choice | Yes |
| Email | Text | Yes |
| Phone | Text | No |
| Extension | Text | No |
| Order | Number | No |
| IsActive | Yes/No | No |

### Tools Directory List
| Column | Type | Required |
|--------|------|----------|
| ToolName | Text | Yes |
| Description | Text | Yes |
| URL | Hyperlink | Yes |
| Category | Choice | Yes |
| IconName | Text | No |
| AccessLevel | Choice | No |
| Order | Number | No |
| IsActive | Yes/No | No |

## Troubleshooting

**Error: Access Denied**
- Ensure you have Site Owner permissions

**Error: List already exists**
- The script skips existing lists
- Delete the list manually if you want to recreate it

**Error: PnP Module not found**
```powershell
Install-Module PnP.PowerShell -Scope CurrentUser -Force
```
