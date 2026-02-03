import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IQuickAccessLinksProps {
  title: string;
  columns: number;
  isDarkTheme: boolean;
  context: WebPartContext;
}
