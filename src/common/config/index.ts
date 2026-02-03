/**
 * Environment and application configuration
 */

export interface IAppConfig {
  siteUrl: string;
  listsConfig: IListsConfig;
}

export interface IListsConfig {
  newsLibrary: string;
  faqList: string;
  suggestionList: string;
  hrContactsList: string;
  toolsDirectoryList: string;
  productsListSiteUrl: string;
  productsList: string;
}

/**
 * Default configuration - override in web part properties
 */
export const defaultConfig: IAppConfig = {
  siteUrl: '',
  listsConfig: {
    newsLibrary: 'Site Pages',
    faqList: 'FAQ',
    suggestionList: 'Suggestions',
    hrContactsList: 'HR Contacts',
    toolsDirectoryList: 'Tools Directory',
    productsListSiteUrl: '',
    productsList: 'Products'
  }
};
