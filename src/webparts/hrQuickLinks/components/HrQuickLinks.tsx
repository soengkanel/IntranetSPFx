import * as React from 'react';
import styles from '../HrQuickLinksWebPart.module.scss';
import type { IHrQuickLinksProps } from './IHrQuickLinksProps';
import { Icon } from '@fluentui/react';

const hrLinks = [
  { id: 1, title: 'Leave Request', url: '#', icon: 'Calendar' },
  { id: 2, title: 'Payslip', url: '#', icon: 'Money' },
  { id: 3, title: 'Benefits', url: '#', icon: 'Heart' },
  { id: 4, title: 'Training', url: '#', icon: 'Education' },
  { id: 5, title: 'Policies', url: '#', icon: 'Library' },
  { id: 6, title: 'Employee Directory', url: '#', icon: 'People' }
];

export default class HrQuickLinks extends React.Component<IHrQuickLinksProps> {
  public render(): React.ReactElement<IHrQuickLinksProps> {
    const { title } = this.props;
    return (
      <section className={styles.hrQuickLinks}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.linksGrid}>
          {hrLinks.map(link => (
            <a key={link.id} href={link.url} className={styles.linkItem}>
              <Icon iconName={link.icon} className={styles.linkIcon} />
              <span className={styles.linkText}>{link.title}</span>
            </a>
          ))}
        </div>
      </section>
    );
  }
}
