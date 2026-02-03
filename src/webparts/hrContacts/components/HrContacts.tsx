import * as React from 'react';
import styles from '../HrContactsWebPart.module.scss';
import type { IHrContactsProps } from './IHrContactsProps';
import { Icon, Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';
import { SPHttpClient } from '@microsoft/sp-http';

interface IHrContact {
  id: number;
  fullName: string;
  jobTitle: string;
  department: string;
  email: string;
  phone?: string;
  extension?: string;
}

interface IState {
  contacts: IHrContact[];
  loading: boolean;
  error: string | undefined;
}

export default class HrContacts extends React.Component<IHrContactsProps, IState> {
  constructor(props: IHrContactsProps) {
    super(props);
    this.state = { contacts: [], loading: true, error: undefined };
  }

  public componentDidMount(): void {
    this._loadContacts().catch(err => {
      console.error('Failed to load contacts:', err);
      this.setState({ loading: false, error: 'Failed to load contacts' });
    });
  }

  private async _loadContacts(): Promise<void> {
    const { spHttpClient, siteUrl } = this.props;

    // Check if we have the required props
    if (!spHttpClient || !siteUrl) {
      // Use mock data for local workbench
      this.setState({
        contacts: [
          { id: 1, fullName: 'Demo User', jobTitle: 'HR Manager', department: 'HR', email: 'demo@example.com', phone: '+855 12 345 678' }
        ],
        loading: false
      });
      return;
    }

    try {
      const listName = 'HR Contacts';
      const apiUrl = `${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Id,Title,FullName,JobTitle,Department,Email,Phone,Extension,ContactOrder,IsActive&$filter=IsActive eq 1&$orderby=ContactOrder asc`;

      const response = await spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const contacts: IHrContact[] = data.value.map((item: any) => ({
        id: item.Id,
        fullName: item.FullName || item.Title || '',
        jobTitle: item.JobTitle || '',
        department: item.Department || '',
        email: item.Email || '',
        phone: item.Phone,
        extension: item.Extension
      }));

      this.setState({ contacts, loading: false });
    } catch (err) {
      console.error('Error loading HR Contacts:', err);
      this.setState({
        loading: false,
        error: 'Failed to load HR contacts. Please check that the list exists.'
      });
    }
  }

  public render(): React.ReactElement<IHrContactsProps> {
    const { title } = this.props;
    const { contacts, loading, error } = this.state;

    return (
      <section className={styles.hrContacts}>
        {title && <h2 className={styles.title}>{title}</h2>}

        {loading && (
          <div className={styles.loading}>
            <Spinner size={SpinnerSize.large} label="Loading contacts..." />
          </div>
        )}

        {error && (
          <MessageBar messageBarType={MessageBarType.error}>
            {error}
          </MessageBar>
        )}

        {!loading && !error && contacts.length === 0 && (
          <MessageBar messageBarType={MessageBarType.info}>
            No HR contacts found.
          </MessageBar>
        )}

        {!loading && !error && contacts.length > 0 && (
          <div className={styles.contactsGrid}>
            {contacts.map(contact => (
              <div key={contact.id} className={styles.contactCard}>
                <div className={styles.contactPhoto}>
                  <Icon iconName="Contact" />
                </div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactName}>{contact.fullName}</div>
                  <div className={styles.contactTitle}>{contact.jobTitle}</div>
                  <div className={styles.contactDepartment}>{contact.department}</div>
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className={styles.contactDetail}>
                      <Icon iconName="Mail" /> {contact.email}
                    </a>
                  )}
                  {contact.phone && (
                    <a href={`tel:${contact.phone}`} className={styles.contactDetail}>
                      <Icon iconName="Phone" /> {contact.phone}
                      {contact.extension && ` ext. ${contact.extension}`}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  }
}
