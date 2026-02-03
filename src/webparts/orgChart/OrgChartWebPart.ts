import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'OrgChartWebPartStrings';
import OrgChart from './components/OrgChart';
import { IOrgChartProps } from './components/IOrgChartProps';

export interface IOrgChartWebPartProps { title: string; }

export default class OrgChartWebPart extends BaseClientSideWebPart<IOrgChartWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IOrgChartProps> = React.createElement(OrgChart, {
      title: this.properties.title, isDarkTheme: this._isDarkTheme, context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('title', { label: strings.TitleFieldLabel })] }]
      }]
    };
  }
}
