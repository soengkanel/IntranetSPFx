import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'TopResourcesWebPartStrings';
import TopResources from './components/TopResources';
import { ITopResourcesProps } from './components/ITopResourcesProps';

export interface ITopResourcesWebPartProps {
  title: string;
  numberOfItems: number;
}

export default class TopResourcesWebPart extends BaseClientSideWebPart<ITopResourcesWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ITopResourcesProps> = React.createElement(TopResources, {
      title: this.properties.title,
      numberOfItems: this.properties.numberOfItems,
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
            PropertyPaneSlider('numberOfItems', { label: 'Number of items', min: 3, max: 12, value: 6 })
          ]
        }]
      }]
    };
  }
}
