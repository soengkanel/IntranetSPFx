import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'NewsArchiveWebPartStrings';
import NewsArchive from './components/NewsArchive';
import { INewsArchiveProps } from './components/INewsArchiveProps';

export interface INewsArchiveWebPartProps { title: string; itemsPerPage: number; }

export default class NewsArchiveWebPart extends BaseClientSideWebPart<INewsArchiveWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<INewsArchiveProps> = React.createElement(NewsArchive, {
      title: this.properties.title, itemsPerPage: this.properties.itemsPerPage,
      isDarkTheme: this._isDarkTheme, context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void { if (currentTheme) this._isDarkTheme = !!currentTheme.isInverted; }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('title', { label: strings.TitleFieldLabel }), PropertyPaneSlider('itemsPerPage', { label: 'Items per page', min: 5, max: 20, value: 10 })] }] }] };
  }
}
