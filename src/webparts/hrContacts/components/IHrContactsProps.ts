import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

export interface IHrContactsProps {
  title: string;
  isDarkTheme: boolean;
  context: WebPartContext;
  spHttpClient: SPHttpClient;
  siteUrl: string;
}
