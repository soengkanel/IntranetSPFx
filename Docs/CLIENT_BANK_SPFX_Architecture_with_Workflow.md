# CLIENT BANK Intranet -- SPFx Package Architecture, Web Parts & Workflow Design

## 1. Purpose

This document describes the final **SPFx package architecture**, web
part inventory, and **workflow approach** for the CLIENT BANK Cambodia
intranet project.\
It is based on the approved **High-Level Design (HLD)** and finalized UI
mockups.\
Scope is **execution-only** using **SPFx-enhanced components** on
SharePoint Online.

------------------------------------------------------------------------

## 2. Delivery Principles

-   Single SPFx solution package
-   Multiple web parts and extensions in one deployment
-   No requirements analysis, IA, or UX redesign
-   Native SharePoint governance and workflow
-   Bank-grade security, auditability, and maintainability

------------------------------------------------------------------------

## 3. SPFx Packaging Strategy

### 3.1 Solution Model

-   **One SPFx solution**
-   **One `.sppkg` file**
-   Deployed via SharePoint App Catalog

**Solution name:** `client-bank-intranet`

### 3.2 Package Contents

-   Application Customizer (Global Navigation)
-   Multiple SPFx Web Parts
-   Shared services, models, and UI components

------------------------------------------------------------------------

## 4. SPFx Component Inventory

### 4.1 Extensions

  -----------------------------------------------------------------------
  Extension                             Purpose
  ------------------------------------- ---------------------------------
  Global Header & Navigation            Implements Level 1 & Level 2 site
                                        navigation

  -----------------------------------------------------------------------

------------------------------------------------------------------------

### 4.2 Web Parts

#### Home Page

-   Headline News Web Part\
-   Quick Access Links Web Part\
-   Top Resources Web Part\
-   News & Events Carousel Web Part\
-   FAQ Accordion Web Part\
-   Suggestion Box Web Part

#### CLIENT BANK

-   Organization Chart Web Part

#### Human Resources

-   HR Quick Links Web Part\
-   HR Contacts Web Part

#### Products & Services

-   Products Landing Search Web Part\
-   Products List & Filter Web Part\
-   Product Detail Web Part

#### Tools

-   Tools Directory Web Part

#### News & Events

-   News Archive Web Part

------------------------------------------------------------------------

## 5. Repository Structure

    client-bank-intranet-spfx/
    ├─ src/
    │  ├─ extensions/
    │  │  └─ globalHeaderNav/
    │  ├─ webparts/
    │  │  ├─ headlineNews/
    │  │  ├─ quickAccessLinks/
    │  │  ├─ topResources/
    │  │  ├─ newsEventsCarousel/
    │  │  ├─ faqAccordion/
    │  │  ├─ suggestionBox/
    │  │  ├─ orgChart/
    │  │  ├─ hrContacts/
    │  │  ├─ productsLandingSearch/
    │  │  ├─ productsListFilter/
    │  │  ├─ productDetail/
    │  │  ├─ toolsDirectory/
    │  │  └─ newsArchive/
    │  └─ common/
    │     ├─ services/
    │     ├─ models/
    │     ├─ ui/
    │     └─ config/
    └─ sharepoint/
       └─ solution/
          └─ client-bank-intranet.sppkg

------------------------------------------------------------------------

## 6. Data Source Mapping

  Feature           SharePoint Source
  ----------------- ------------------------------------------
  News & Headline   Site Pages Library
  FAQ               FAQ List
  Suggestions       Suggestion List
  HR Contacts       HR Contacts List
  Tools             Tools Directory List
  Products          Products & Services List (external site)

------------------------------------------------------------------------

## 7. Configuration Strategy

### 7.1 Web Part Properties

-   Display title
-   Number of items
-   Default filters
-   View-all links

### 7.2 Environment Configuration

-   Site URLs
-   List/library names
-   Metadata internal names

All mappings are centralized in configuration files to avoid hardcoding.

------------------------------------------------------------------------

## 8. Workflow & Governance Model (SharePoint Native)

### 8.1 Content Approval Workflow (Maker--Checker)

Applies to: - Site Pages (News, Pages) - Resources document library - HR
policy documents

**Workflow behavior:** 1. Contributor creates or updates content (Draft)
2. Content submitted for approval 3. Marketing & Communication reviews
4. Content is **Approved** or **Rejected** 5. Only **Approved** content
is visible to staff

**Implementation:** - SharePoint **Content Approval** - Versioning
enabled - Approval history retained

No Power Automate required.

------------------------------------------------------------------------

### 8.2 News & Publishing Workflow

-   News posts created in Site Pages library
-   Page Category and Headline metadata applied
-   Home page web parts query **Approved** content only

------------------------------------------------------------------------

### 8.3 Document Lifecycle Control

-   Version history enabled
-   Obsolete documents manually marked or replaced
-   Ownership per content area defined

------------------------------------------------------------------------

### 8.4 Submission Workflow (Suggestion Box)

-   Users submit suggestions via SPFx web part
-   Items stored in SharePoint list
-   No approval before submission
-   Review handled manually by business users

------------------------------------------------------------------------

### 8.5 Out-of-Scope Workflow (Phase 2)

The following are **not included** in MVP: - Multi-step approvals - SLA
or escalation rules - Automatic expiry or reminders - Background
automation

These would require Power Automate and are considered enhancements.

------------------------------------------------------------------------

## 9. Governance & Security

-   Native SharePoint permissions
-   Role-based access (Owners, Members, Visitors)
-   Single-step approval authority
-   Audit-ready configuration

------------------------------------------------------------------------

## 10. Versioning & Release Strategy

  Version   Description
  --------- --------------------
  v1.0.0    MVP Go-live
  v1.0.x    Bug fixes
  v1.1.0    Minor enhancements
  v2.0.0    Major changes

------------------------------------------------------------------------

## 11. Build & Deployment Flow

1.  Configure lists, libraries, metadata, and approvals\
2.  Deploy SPFx package to App Catalog\
3.  Activate extension and add web parts\
4.  Perform UAT\
5.  Production deployment

------------------------------------------------------------------------

## 12. Out of Scope

-   Requirements gathering
-   UX or IA redesign
-   Content creation
-   Power Automate workflows
-   Power Apps
-   Multilingual support
-   Third-party tools

------------------------------------------------------------------------

## 13. Conclusion

This SPFx architecture and **native workflow model** provide a scalable,
compliant, and low-risk intranet foundation for CLIENT BANK, fully
aligned with the approved HLD and banking governance standards.
