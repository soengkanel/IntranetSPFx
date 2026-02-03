import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'FaqAccordionWebPartStrings';
import FaqAccordion from './components/FaqAccordion';
import { IFaqAccordionProps } from './components/IFaqAccordionProps';

export interface IFaqAccordionWebPartProps { title: string; numberOfItems: number; }

export default class FaqAccordionWebPart extends BaseClientSideWebPart<IFaqAccordionWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IFaqAccordionProps> = React.createElement(FaqAccordion, {
      title: this.properties.title, numberOfItems: this.properties.numberOfItems,
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
            PropertyPaneSlider('numberOfItems', { label: 'Number of FAQs', min: 5, max: 20, value: 10 })
          ]
        }]
      }]
    };
  }
}
