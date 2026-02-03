import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface INewsEventsCarouselProps {
  title: string;
  autoPlayInterval: number;
  numberOfItems: number;
  isDarkTheme: boolean;
  context: WebPartContext;
}
