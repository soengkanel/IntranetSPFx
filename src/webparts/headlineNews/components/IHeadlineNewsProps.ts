import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IHeadlineNewsProps {
  title: string;
  numberOfItems: number;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  context: WebPartContext;
}
