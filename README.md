# CLIENT BANK Intranet

SharePoint Framework solution for CLIENT BANK Cambodia intranet portal.

## Tech Stack

- **SPFx**: 1.22.2 (Stable)
- **Node.js**: 22.14.0+
- **TypeScript**: 5.8.2
- **Build Tool**: Heft
- **UI Framework**: React 17 + Fluent UI React 8.x

## Web Parts

### Home Page
| Web Part | Description |
|----------|-------------|
| Headline News | Featured news banner |
| Quick Access Links | Shortcut links grid |
| Top Resources | Important documents/resources |
| News & Events Carousel | Rotating news/events display |
| FAQ Accordion | Expandable FAQ section |
| Suggestion Box | User feedback submission form |

### CLIENT BANK
| Web Part | Description |
|----------|-------------|
| Organization Chart | Company org structure |

### Human Resources
| Web Part | Description |
|----------|-------------|
| HR Quick Links | HR-related shortcuts |
| HR Contacts | HR team contact cards |

### Products & Services
| Web Part | Description |
|----------|-------------|
| Products Landing Search | Product search interface |
| Products List & Filter | Filterable product catalog |
| Product Detail | Single product view |

### Tools & News
| Web Part | Description |
|----------|-------------|
| Tools Directory | Internal tools listing |
| News Archive | Historical news articles |

## Extensions

| Extension | Description |
|-----------|-------------|
| Global Header & Navigation | Site-wide L1/L2 navigation |

## Prerequisites

- Node.js 22.14.0 or higher (but below 23.0.0)
- Microsoft 365 tenant with SharePoint admin access
- SPFx development environment configured

## Getting Started

```bash
# Install dependencies
npm install

# Trust the dev certificate (first time only)
npm run trust-dev-cert

# Start local development server
npm run start
```

Then open your SharePoint workbench:
```
https://<your-tenant>.sharepoint.com/_layouts/15/workbench.aspx
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start local dev server with hot reload |
| `npm run build` | Build the solution |
| `npm run test` | Run tests |
| `npm run package-solution` | Create .sppkg deployment package |
| `npm run clean` | Clean build artifacts |
| `npm run trust-dev-cert` | Trust the development SSL certificate |
| `npm run untrust-dev-cert` | Remove the trusted dev certificate |

## Adding a New Web Part

### Using Yeoman Generator (Recommended)

**Step 1: Install Yeoman and SPFx generator (if not installed)**

```bash
npm install -g yo @microsoft/generator-sharepoint
```

**Step 2: Run the generator**

```bash
# Navigate to project root
cd IntranetSPFX

# Run the SPFx Yeoman generator
yo @microsoft/sharepoint
```

**Step 3: Answer the prompts**

```
? What is your solution name? (Press Enter to keep current)
? Which type of client-side component to create? WebPart
? What is your Web part name? MyNewWebPart
? Which template would you like to use? React
```

> **Important:** Select **"React"** as the template for all new web parts. This project uses React + Fluent UI for:
> - Complex UI components (carousels, accordions, org charts)
> - Shared reusable components across web parts
> - Better state management for interactive features
> - Consistent Microsoft 365 styling with Fluent UI

**Step 4: Verify and test**

```bash
npm run start
```

Open the workbench and your new web part should appear in the toolbox.

## Running the Solution

### Local Development

1. **First-time setup**:
   ```bash
   npm install
   npm run trust-dev-cert
   ```

2. **Start the dev server**:
   ```bash
   npm run start
   ```
   This starts a local server at `https://localhost:4321`

3. **Test in SharePoint Workbench**:
   - Online workbench: `https://<tenant>.sharepoint.com/_layouts/15/workbench.aspx`
   - Add your web parts from the toolbox

4. **Test on a real page**:
   - Append `?debugManifestsFile=https://localhost:4321/temp/manifests.js` to any SharePoint page URL
   - Edit the page and add your web part

### Build for Testing

```bash
npm run build
```

Check for errors and warnings before deployment.

## Deployment

### Step 1: Build the Package

```bash
# Clean previous builds
npm run clean

# Build the solution
npm run build

# Create the .sppkg package
npm run package-solution
```

The package will be created at:
```
sharepoint/solution/client-bank-intranet.sppkg
```

### Step 2: Deploy to App Catalog

**For Tenant-wide deployment:**

1. Go to SharePoint Admin Center → More features → Apps → App Catalog
2. Click **Apps for SharePoint**
3. Upload the `.sppkg` file
4. In the dialog:
   - Check **Make this solution available to all sites** for tenant-wide deployment
   - Click **Deploy**

**For Site Collection deployment:**

1. Go to Site Contents → Site Collection App Catalog (must be enabled)
2. Upload the `.sppkg` file
3. Click **Deploy**

### Step 3: Add to a Page

1. Navigate to a SharePoint page
2. Click **Edit**
3. Click **+** to add a web part
4. Search for your web part name
5. Click to add it to the page
6. **Save** or **Publish** the page

### Step 4: API Permissions (if needed)

If your web parts use Microsoft Graph or other APIs:

1. Go to SharePoint Admin Center → Advanced → API access
2. Approve pending permission requests

## Project Structure

```
src/
├── extensions/
│   └── globalHeaderNav/       # Global navigation extension
├── webparts/
│   ├── headlineNews/          # Headline news web part
│   ├── quickAccessLinks/      # Quick links web part
│   ├── topResources/          # Resources web part
│   ├── newsEventsCarousel/    # Carousel web part
│   ├── faqAccordion/          # FAQ web part
│   ├── suggestionBox/         # Suggestion form web part
│   ├── orgChart/              # Organization chart web part
│   ├── hrQuickLinks/          # HR quick links web part
│   ├── hrContacts/            # HR contacts web part
│   ├── productsLandingSearch/ # Product search web part
│   ├── productsListFilter/    # Product list web part
│   ├── productDetail/         # Product detail web part
│   ├── toolsDirectory/        # Tools directory web part
│   └── newsArchive/           # News archive web part
└── common/
    ├── services/              # SharePoint API services
    ├── models/                # TypeScript interfaces
    ├── ui/                    # Shared React components
    └── config/                # Environment configuration
config/                        # SPFx configuration files
sharepoint/
└── solution/
    └── client-bank-intranet.sppkg
```

## Data Sources

| Feature | SharePoint Source |
|---------|-------------------|
| News & Headline | Site Pages Library |
| FAQ | FAQ List |
| Suggestions | Suggestion List |
| HR Contacts | HR Contacts List |
| Tools | Tools Directory List |
| Products | Products & Services List |

## References

- [SPFx Documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SPFx API Reference](https://docs.microsoft.com/en-us/javascript/api/overview/sharepoint)
- [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)
- [React Documentation](https://react.dev/)
