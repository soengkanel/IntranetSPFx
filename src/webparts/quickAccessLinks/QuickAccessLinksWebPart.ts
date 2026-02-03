import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'QuickAccessLinksWebPartStrings';
import QuickAccessLinks from './components/QuickAccessLinks';
import { IQuickAccessLinksProps } from './components/IQuickAccessLinksProps';

export interface IQuickAccessLinksWebPartProps {
  title: string;
  columns: number;
}

export default class QuickAccessLinksWebPart extends BaseClientSideWebPart<IQuickAccessLinksWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IQuickAccessLinksProps> = React.createElement(QuickAccessLinks, {
      title: this.properties.title,
      columns: this.properties.columns,
      isDarkTheme: this._isDarkTheme,
      context: this.context
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: strings.PropertyPaneDescription },
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [
            PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
            PropertyPaneSlider('columns', { label: 'Number of columns', min: 2, max: 6, value: 4 })
          ]
        }]
      }]
    };
  }
}
