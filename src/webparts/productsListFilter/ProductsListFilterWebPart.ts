import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'ProductsListFilterWebPartStrings';
import ProductsListFilter from './components/ProductsListFilter';
import { IProductsListFilterProps } from './components/IProductsListFilterProps';

export interface IProductsListFilterWebPartProps { title: string; itemsPerPage: number; }

export default class ProductsListFilterWebPart extends BaseClientSideWebPart<IProductsListFilterWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IProductsListFilterProps> = React.createElement(ProductsListFilter, {
      title: this.properties.title, itemsPerPage: this.properties.itemsPerPage,
      isDarkTheme: this._isDarkTheme, context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void { if (currentTheme) this._isDarkTheme = !!currentTheme.isInverted; }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('title', { label: strings.TitleFieldLabel }), PropertyPaneSlider('itemsPerPage', { label: 'Items per page', min: 6, max: 24, value: 12 })] }] }] };
  }
}
