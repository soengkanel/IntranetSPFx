/**
 * TypeScript interfaces for Bred Bank Cambodia Intranet
 * These interfaces match the SharePoint list schemas
 */

// ============================================
// News & Content (Site Pages)
// ============================================
export interface INewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  publishedDate: Date;
  category: 'Announcement' | 'Event' | 'Product' | 'CSR' | 'Financial' | 'HR' | 'IT';
  isHeadline: boolean;
  author?: string;
  pageUrl?: string;
}

// ============================================
// FAQ List
// ============================================
export interface IFaqItem {
  id: number;
  question: string;
  answer: string;
  category: 'General' | 'HR' | 'IT' | 'Finance' | 'Operations' | 'Products';
  order: number;
  isActive: boolean;
}

// ============================================
// HR Contacts List
// ============================================
export interface IHrContact {
  id: number;
  fullName: string;
  jobTitle: string;
  department: 'HR Management' | 'Recruitment' | 'Payroll & Benefits' | 'Training & Development' | 'Employee Relations';
  email: string;
  phone?: string;
  extension?: string;
  photoUrl?: string;
  order: number;
  isActive: boolean;
}

// ============================================
// Products and Services List
// ============================================
export interface IProduct {
  id: number;
  productName: string;
  description: string;
  shortDescription?: string;
  category: 'Personal Banking' | 'Business Banking' | 'Loans' | 'Cards' | 'Insurance' | 'Investments' | 'Digital Banking';
  features?: string;
  imageUrl?: string;
  documentUrl?: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

// ============================================
// Tools Directory List
// ============================================
export interface ITool {
  id: number;
  toolName: string;
  description: string;
  url: string;
  category: 'Core Banking' | 'HR Systems' | 'IT Support' | 'Finance' | 'Communication' | 'Documents' | 'Learning' | 'Reporting';
  iconName?: string;
  order: number;
  isActive: boolean;
  accessLevel?: 'All Staff' | 'Management' | 'IT Only' | 'HR Only' | 'Finance Only';
}

// ============================================
// Suggestions List
// ============================================
export interface ISuggestion {
  id: number;
  suggestionTitle: string;
  description: string;
  submittedBy?: string;
  submittedDate: Date;
  status: 'Pending' | 'Under Review' | 'Implemented' | 'Rejected';
  adminComments?: string;
  category?: 'Process Improvement' | 'Technology' | 'Workplace' | 'Benefits' | 'Training' | 'Other';
}

// ============================================
// Quick Links List
// ============================================
export interface IQuickLink {
  id: number;
  linkTitle: string;
  url: string;
  iconName?: string;
  category?: 'Home Page' | 'HR Page' | 'Finance Page' | 'IT Page';
  order: number;
  openInNewTab: boolean;
  isActive: boolean;
}

// ============================================
// Organization Chart (from User Profiles or List)
// ============================================
export interface IOrgPerson {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  managerId?: number;
}

// ============================================
// SharePoint List Item Base
// ============================================
export interface ISharePointListItem {
  Id: number;
  Title: string;
  Created: string;
  Modified: string;
  Author?: {
    Title: string;
    Email: string;
  };
  Editor?: {
    Title: string;
    Email: string;
  };
}
