import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'ProductsLandingSearchWebPartStrings';
import ProductsLandingSearch from './components/ProductsLandingSearch';
import { IProductsLandingSearchProps } from './components/IProductsLandingSearchProps';

export interface IProductsLandingSearchWebPartProps {
  title: string;
  searchPlaceholder: string;
  listName: string;
}

export default class ProductsLandingSearchWebPart extends BaseClientSideWebPart<IProductsLandingSearchWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IProductsLandingSearchProps> = React.createElement(ProductsLandingSearch, {
      title: this.properties.title,
      searchPlaceholder: this.properties.searchPlaceholder,
      listName: this.properties.listName,
      isDarkTheme: this._isDarkTheme,
      context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (currentTheme) {
      this._isDarkTheme = !!currentTheme.isInverted;
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title',
                  value: 'RETAIL BANKING OFFERS'
                }),
                PropertyPaneTextField('searchPlaceholder', {
                  label: 'Search Placeholder',
                  value: 'Type here to get results in seconds..'
                }),
                PropertyPaneTextField('listName', {
                  label: 'SharePoint List Name',
                  value: 'Products and Services'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
