#!/bin/bash

# ============================================
# Bred Bank Cambodia - SharePoint List Provisioning
# Using CLI for Microsoft 365
# ============================================

# Check if site URL is provided
if [ -z "$1" ]; then
    echo "Usage: ./provision-lists.sh <site-url>"
    echo "Example: ./provision-lists.sh https://demo081225.sharepoint.com/sites/Demo"
    exit 1
fi

SITE_URL=$1

echo ""
echo "========================================"
echo "Bred Bank Cambodia Intranet Provisioning"
echo "========================================"
echo ""
echo "Site: $SITE_URL"
echo ""

# Check if logged in
echo "Checking authentication..."
m365 status || { echo "Please run 'm365 login' first"; exit 1; }

echo ""
echo "Creating SharePoint lists..."
echo ""

# ============================================
# 1. FAQ List
# ============================================
echo "Creating FAQ list..."
m365 spo list add --title "FAQ" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  FAQ list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "FAQ" --xml '<Field Type="Text" DisplayName="Question" Name="Question" Required="TRUE" MaxLength="500"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "FAQ" --xml '<Field Type="Note" DisplayName="Answer" Name="Answer" Required="TRUE" RichText="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "FAQ" --xml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>General</CHOICE><CHOICE>HR</CHOICE><CHOICE>IT</CHOICE><CHOICE>Finance</CHOICE><CHOICE>Operations</CHOICE><CHOICE>Products</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "FAQ" --xml '<Field Type="Number" DisplayName="Order" Name="FAQOrder"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "FAQ" --xml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>' 2>/dev/null
echo "  FAQ list created"

# ============================================
# 2. Suggestions List
# ============================================
echo "Creating Suggestions list..."
m365 spo list add --title "Suggestions" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  Suggestions list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "Suggestions" --xml '<Field Type="Text" DisplayName="SuggestionTitle" Name="SuggestionTitle" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Suggestions" --xml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Suggestions" --xml '<Field Type="Choice" DisplayName="Status" Name="Status" Required="TRUE"><Default>Pending</Default><CHOICES><CHOICE>Pending</CHOICE><CHOICE>Under Review</CHOICE><CHOICE>Implemented</CHOICE><CHOICE>Rejected</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Suggestions" --xml '<Field Type="Note" DisplayName="AdminComments" Name="AdminComments"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Suggestions" --xml '<Field Type="Choice" DisplayName="SuggestionCategory" Name="SuggestionCategory"><CHOICES><CHOICE>Process Improvement</CHOICE><CHOICE>Technology</CHOICE><CHOICE>Workplace</CHOICE><CHOICE>Benefits</CHOICE><CHOICE>Training</CHOICE><CHOICE>Other</CHOICE></CHOICES></Field>' 2>/dev/null
echo "  Suggestions list created"

# ============================================
# 3. HR Contacts List
# ============================================
echo "Creating HR Contacts list..."
m365 spo list add --title "HR Contacts" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  HR Contacts list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Text" DisplayName="FullName" Name="FullName" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Text" DisplayName="JobTitle" Name="JobTitle" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Choice" DisplayName="Department" Name="Department" Required="TRUE"><CHOICES><CHOICE>HR Management</CHOICE><CHOICE>Recruitment</CHOICE><CHOICE>Payroll &amp; Benefits</CHOICE><CHOICE>Training &amp; Development</CHOICE><CHOICE>Employee Relations</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Text" DisplayName="Email" Name="Email" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Text" DisplayName="Phone" Name="Phone"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Text" DisplayName="Extension" Name="Extension"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Number" DisplayName="Order" Name="ContactOrder"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "HR Contacts" --xml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>' 2>/dev/null
echo "  HR Contacts list created"

# ============================================
# 4. Tools Directory List
# ============================================
echo "Creating Tools Directory list..."
m365 spo list add --title "Tools Directory" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  Tools Directory list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Text" DisplayName="ToolName" Name="ToolName" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="URL" DisplayName="URL" Name="ToolURL" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>Core Banking</CHOICE><CHOICE>HR Systems</CHOICE><CHOICE>IT Support</CHOICE><CHOICE>Finance</CHOICE><CHOICE>Communication</CHOICE><CHOICE>Documents</CHOICE><CHOICE>Learning</CHOICE><CHOICE>Reporting</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Text" DisplayName="IconName" Name="IconName"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Number" DisplayName="Order" Name="ToolOrder"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Tools Directory" --xml '<Field Type="Choice" DisplayName="AccessLevel" Name="AccessLevel"><CHOICES><CHOICE>All Staff</CHOICE><CHOICE>Management</CHOICE><CHOICE>IT Only</CHOICE><CHOICE>HR Only</CHOICE><CHOICE>Finance Only</CHOICE></CHOICES></Field>' 2>/dev/null
echo "  Tools Directory list created"

# ============================================
# 5. Quick Links List
# ============================================
echo "Creating Quick Links list..."
m365 spo list add --title "Quick Links" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  Quick Links list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Text" DisplayName="LinkTitle" Name="LinkTitle" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="URL" DisplayName="URL" Name="LinkURL" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Text" DisplayName="IconName" Name="IconName"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Choice" DisplayName="Category" Name="LinkCategory"><CHOICES><CHOICE>Home Page</CHOICE><CHOICE>HR Page</CHOICE><CHOICE>Finance Page</CHOICE><CHOICE>IT Page</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Number" DisplayName="Order" Name="LinkOrder" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Boolean" DisplayName="OpenInNewTab" Name="OpenInNewTab"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Quick Links" --xml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>' 2>/dev/null
echo "  Quick Links list created"

# ============================================
# 6. Products and Services List
# ============================================
echo "Creating Products and Services list..."
m365 spo list add --title "Products and Services" --baseTemplate GenericList --webUrl "$SITE_URL" 2>/dev/null || echo "  Products and Services list may already exist"

m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Text" DisplayName="ProductName" Name="ProductName" Required="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Note" DisplayName="Description" Name="Description" Required="TRUE" RichText="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Note" DisplayName="ShortDescription" Name="ShortDescription"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Choice" DisplayName="Category" Name="Category" Required="TRUE"><CHOICES><CHOICE>Personal Banking</CHOICE><CHOICE>Business Banking</CHOICE><CHOICE>Loans</CHOICE><CHOICE>Cards</CHOICE><CHOICE>Insurance</CHOICE><CHOICE>Investments</CHOICE><CHOICE>Digital Banking</CHOICE></CHOICES></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Note" DisplayName="Features" Name="Features" RichText="TRUE"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="URL" DisplayName="ImageUrl" Name="ImageUrl"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Boolean" DisplayName="IsActive" Name="IsActive"><Default>1</Default></Field>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Boolean" DisplayName="IsFeatured" Name="IsFeatured"/>' 2>/dev/null
m365 spo field add --webUrl "$SITE_URL" --listTitle "Products and Services" --xml '<Field Type="Number" DisplayName="Order" Name="ProductOrder"/>' 2>/dev/null
echo "  Products and Services list created"

echo ""
echo "========================================"
echo "All lists created successfully!"
echo "========================================"
echo ""
echo "Next: Run ./import-sample-data.sh $SITE_URL"
echo ""
