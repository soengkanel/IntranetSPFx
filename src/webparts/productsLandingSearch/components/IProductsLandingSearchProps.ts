import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IProduct {
  id: number;
  productName: string;
  description: string;
  customerSegment: string;
  productCategories: string;
  targetMarket: string;
  productFeatures: string;
  feesAndCharges: string;
  requirement: string;
  trainingMaterials: string;
  complexity: string;
  searchKeyWords: string;
  productBusinessOwnership: string;
  imageUrl?: string;
  status: string;
}

export interface IProductCategory {
  name: string;
  products: IProduct[];
  isExpanded: boolean;
}

export interface IProductsLandingSearchProps {
  title: string;
  searchPlaceholder: string;
  isDarkTheme: boolean;
  context: WebPartContext;
  listName: string;
}
