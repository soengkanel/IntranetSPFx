import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ITopResourcesProps {
  title: string;
  numberOfItems: number;
  isDarkTheme: boolean;
  context: WebPartContext;
}
