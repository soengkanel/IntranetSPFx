import * as React from 'react';
import styles from '../QuickAccessLinksWebPart.module.scss';
import type { IQuickAccessLinksProps } from './IQuickAccessLinksProps';
import { Icon } from '@fluentui/react';

interface IQuickLinkLocal {
  id: number;
  linkTitle: string;
  url: string;
  iconName?: string;
  order: number;
  openInNewTab: boolean;
  isActive: boolean;
}

interface IState { links: IQuickLinkLocal[]; loading: boolean; }

export default class QuickAccessLinks extends React.Component<IQuickAccessLinksProps, IState> {
  constructor(props: IQuickAccessLinksProps) {
    super(props);
    this.state = { links: [], loading: true };
  }

  public componentDidMount(): void {
    // TODO: Replace with SharePoint API call
    const mockLinks: IQuickLinkLocal[] = [
      { id: 1, linkTitle: 'HR Portal', url: '#', iconName: 'People', order: 1, openInNewTab: false, isActive: true },
      { id: 2, linkTitle: 'IT Support', url: '#', iconName: 'Headset', order: 2, openInNewTab: false, isActive: true },
      { id: 3, linkTitle: 'Leave Request', url: '#', iconName: 'Calendar', order: 3, openInNewTab: false, isActive: true },
      { id: 4, linkTitle: 'Expense Claims', url: '#', iconName: 'Money', order: 4, openInNewTab: false, isActive: true },
      { id: 5, linkTitle: 'Training', url: '#', iconName: 'Education', order: 5, openInNewTab: false, isActive: true },
      { id: 6, linkTitle: 'Policies', url: '#', iconName: 'Library', order: 6, openInNewTab: false, isActive: true },
      { id: 7, linkTitle: 'Directory', url: '#', iconName: 'ContactCard', order: 7, openInNewTab: false, isActive: true },
      { id: 8, linkTitle: 'News', url: '#', iconName: 'News', order: 8, openInNewTab: false, isActive: true }
    ];
    this.setState({ links: mockLinks, loading: false });
  }

  public render(): React.ReactElement<IQuickAccessLinksProps> {
    const { title, columns } = this.props;
    const { links } = this.state;

    return (
      <section className={styles.quickAccessLinks}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.linksGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {links.map(link => (
              <a key={link.id} href={link.url} className={styles.linkCard}>
                <div className={styles.linkIcon}><Icon iconName={link.iconName || 'Link'} /></div>
                <div className={styles.linkTitle}>{link.linkTitle}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
