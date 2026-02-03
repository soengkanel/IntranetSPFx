import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'SuggestionBoxWebPartStrings';
import SuggestionBox from './components/SuggestionBox';
import { ISuggestionBoxProps } from './components/ISuggestionBoxProps';

export interface ISuggestionBoxWebPartProps { title: string; listName: string; }

export default class SuggestionBoxWebPart extends BaseClientSideWebPart<ISuggestionBoxWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ISuggestionBoxProps> = React.createElement(SuggestionBox, {
      title: this.properties.title, listName: this.properties.listName,
      isDarkTheme: this._isDarkTheme, context: this.context
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
        groups: [{
          groupName: strings.BasicGroupName,
          groupFields: [
            PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
            PropertyPaneTextField('listName', { label: 'SharePoint List Name' })
          ]
        }]
      }]
    };
  }
}
