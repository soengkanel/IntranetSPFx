import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IFaqAccordionProps {
  title: string;
  numberOfItems: number;
  isDarkTheme: boolean;
  context: WebPartContext;
}
