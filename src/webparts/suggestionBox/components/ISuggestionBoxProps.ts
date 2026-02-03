import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ISuggestionBoxProps {
  title: string;
  listName: string;
  isDarkTheme: boolean;
  context: WebPartContext;
}
