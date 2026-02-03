import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { type IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'NewsEventsCarouselWebPartStrings';
import NewsEventsCarousel from './components/NewsEventsCarousel';
import { INewsEventsCarouselProps } from './components/INewsEventsCarouselProps';

export interface INewsEventsCarouselWebPartProps {
  title: string;
  autoPlayInterval: number;
  numberOfItems: number;
}

export default class NewsEventsCarouselWebPart extends BaseClientSideWebPart<INewsEventsCarouselWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<INewsEventsCarouselProps> = React.createElement(NewsEventsCarousel, {
      title: this.properties.title,
      autoPlayInterval: this.properties.autoPlayInterval,
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
            PropertyPaneSlider('autoPlayInterval', { label: 'Auto-play interval (ms)', min: 2000, max: 10000, value: 5000 }),
            PropertyPaneSlider('numberOfItems', { label: 'Number of items', min: 3, max: 10, value: 5 })
          ]
        }]
      }]
    };
  }
}
