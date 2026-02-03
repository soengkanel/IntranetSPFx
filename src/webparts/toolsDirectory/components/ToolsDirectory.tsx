import * as React from 'react';
import styles from '../ToolsDirectoryWebPart.module.scss';
import type { IToolsDirectoryProps } from './IToolsDirectoryProps';
import { Icon } from '@fluentui/react';

interface IToolLocal {
  id: number;
  toolName: string;
  description: string;
  url: string;
  category: string;
  iconName?: string;
  order: number;
  isActive: boolean;
}

interface IState { tools: IToolLocal[]; filteredTools: IToolLocal[]; searchQuery: string; loading: boolean; }

export default class ToolsDirectory extends React.Component<IToolsDirectoryProps, IState> {
  constructor(props: IToolsDirectoryProps) {
    super(props);
    this.state = { tools: [], filteredTools: [], searchQuery: '', loading: true };
  }

  public componentDidMount(): void {
    const mockTools: IToolLocal[] = [
      { id: 1, toolName: 'Core Banking System', description: 'Main banking operations platform', url: '#', category: 'Core Banking', iconName: 'Bank', order: 1, isActive: true },
      { id: 2, toolName: 'HR Portal', description: 'Employee self-service portal', url: '#', category: 'HR Systems', iconName: 'People', order: 2, isActive: true },
      { id: 3, toolName: 'IT Service Desk', description: 'Submit and track IT tickets', url: '#', category: 'IT Support', iconName: 'Headset', order: 3, isActive: true },
      { id: 4, toolName: 'Document Management', description: 'Central document repository', url: '#', category: 'Documents', iconName: 'Document', order: 4, isActive: true },
      { id: 5, toolName: 'Email & Calendar', description: 'Outlook Web Access', url: '#', category: 'Communication', iconName: 'Mail', order: 5, isActive: true },
      { id: 6, toolName: 'Training Portal', description: 'Online learning platform', url: '#', category: 'Learning', iconName: 'Education', order: 6, isActive: true }
    ];
    this.setState({ tools: mockTools, filteredTools: mockTools, loading: false });
  }

  private _handleSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value.toLowerCase();
    const filtered = this.state.tools.filter(t => t.toolName.toLowerCase().includes(query) || t.description.toLowerCase().includes(query));
    this.setState({ searchQuery: e.target.value, filteredTools: filtered });
  }

  public render(): React.ReactElement<IToolsDirectoryProps> {
    const { title } = this.props;
    const { filteredTools, searchQuery } = this.state;

    return (
      <section className={styles.toolsDirectory}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.filterBar}>
          <input type="text" className={styles.searchInput} placeholder="Search tools..." value={searchQuery} onChange={this._handleSearch} />
        </div>
        <div className={styles.toolsGrid}>
          {filteredTools.map(tool => (
            <a key={tool.id} href={tool.url} className={styles.toolCard}>
              <div className={styles.toolIcon}><Icon iconName={tool.iconName || 'AppIconDefault'} /></div>
              <div className={styles.toolName}>{tool.toolName}</div>
              <div className={styles.toolDescription}>{tool.description}</div>
              <div className={styles.toolCategory}>{tool.category}</div>
            </a>
          ))}
        </div>
      </section>
    );
  }
}
