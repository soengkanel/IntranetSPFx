import * as React from 'react';
import styles from '../TopResourcesWebPart.module.scss';
import type { ITopResourcesProps } from './ITopResourcesProps';
import { Icon } from '@fluentui/react';

interface IResource { id: number; title: string; url: string; fileType: string; modifiedDate: Date; }
interface IState { resources: IResource[]; loading: boolean; }

export default class TopResources extends React.Component<ITopResourcesProps, IState> {
  constructor(props: ITopResourcesProps) {
    super(props);
    this.state = { resources: [], loading: true };
  }

  public componentDidMount(): void {
    const mockResources: IResource[] = [
      { id: 1, title: 'Employee Handbook 2024', url: '#', fileType: 'pdf', modifiedDate: new Date() },
      { id: 2, title: 'IT Security Policy', url: '#', fileType: 'docx', modifiedDate: new Date() },
      { id: 3, title: 'Leave Application Form', url: '#', fileType: 'xlsx', modifiedDate: new Date() },
      { id: 4, title: 'Expense Report Template', url: '#', fileType: 'xlsx', modifiedDate: new Date() },
      { id: 5, title: 'Brand Guidelines', url: '#', fileType: 'pdf', modifiedDate: new Date() },
      { id: 6, title: 'Organization Chart', url: '#', fileType: 'pdf', modifiedDate: new Date() }
    ];
    this.setState({ resources: mockResources.slice(0, this.props.numberOfItems), loading: false });
  }

  private _getFileIcon(fileType: string): string {
    const icons: Record<string, string> = { pdf: 'PDF', docx: 'WordDocument', xlsx: 'ExcelDocument', pptx: 'PowerPointDocument' };
    return icons[fileType] || 'Document';
  }

  public render(): React.ReactElement<ITopResourcesProps> {
    const { title } = this.props;
    const { resources } = this.state;

    return (
      <section className={styles.topResources}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.resourcesList}>
            {resources.map(resource => (
              <a key={resource.id} href={resource.url} className={styles.resourceItem}>
                <Icon iconName={this._getFileIcon(resource.fileType)} className={styles.resourceIcon} />
                <div className={styles.resourceInfo}>
                  <div className={styles.resourceTitle}>{resource.title}</div>
                  <div className={styles.resourceMeta}>{resource.fileType.toUpperCase()} • Updated {resource.modifiedDate.toLocaleDateString()}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
