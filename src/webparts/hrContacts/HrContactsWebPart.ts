import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'HrContactsWebPartStrings';
import HrContacts from './components/HrContacts';
import { IHrContactsProps } from './components/IHrContactsProps';

export interface IHrContactsWebPartProps { title: string; }

export default class HrContactsWebPart extends BaseClientSideWebPart<IHrContactsWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IHrContactsProps> = React.createElement(HrContacts, {
      title: this.properties.title,
      isDarkTheme: this._isDarkTheme,
      context: this.context,
      spHttpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });
    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void { if (currentTheme) this._isDarkTheme = !!currentTheme.isInverted; }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('title', { label: strings.TitleFieldLabel })] }] }] };
  }
}
