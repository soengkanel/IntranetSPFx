import * as React from 'react';
import styles from '../HeadlineNewsWebPart.module.scss';
import type { IHeadlineNewsProps } from './IHeadlineNewsProps';
import { Spinner, SpinnerSize, MessageBar, MessageBarType } from '@fluentui/react';

interface INewsItemLocal {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  publishedDate: Date;
  category: string;
  isHeadline: boolean;
}

interface IHeadlineNewsState {
  newsItems: INewsItemLocal[];
  loading: boolean;
  error: string | undefined;
}

export default class HeadlineNews extends React.Component<IHeadlineNewsProps, IHeadlineNewsState> {
  constructor(props: IHeadlineNewsProps) {
    super(props);

    this.state = {
      newsItems: [],
      loading: true,
      error: undefined
    };
  }

  public componentDidMount(): void {
    this._loadNewsItems().catch(() => undefined);
  }

  public componentDidUpdate(prevProps: IHeadlineNewsProps): void {
    if (prevProps.numberOfItems !== this.props.numberOfItems) {
      this._loadNewsItems().catch(() => undefined);
    }
  }

  private async _loadNewsItems(): Promise<void> {
    try {
      this.setState({ loading: true, error: undefined });

      // TODO: Replace with actual SharePoint API call
      // For now, using mock data for development
      const mockNews: INewsItemLocal[] = [
        {
          id: 1,
          title: 'Welcome to CLIENT BANK Intranet',
          description: 'We are excited to launch our new intranet portal. Stay connected with the latest updates and resources.',
          imageUrl: '',
          publishedDate: new Date(),
          category: 'Announcement',
          isHeadline: true
        },
        {
          id: 2,
          title: 'Q4 Results Announcement',
          description: 'CLIENT BANK reports strong performance in Q4 with significant growth across all business segments.',
          imageUrl: '',
          publishedDate: new Date(),
          category: 'Financial',
          isHeadline: true
        },
        {
          id: 3,
          title: 'New Digital Banking Features',
          description: 'Introducing enhanced mobile banking features for our valued customers.',
          imageUrl: '',
          publishedDate: new Date(),
          category: 'Product',
          isHeadline: true
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      this.setState({
        newsItems: mockNews.slice(0, this.props.numberOfItems),
        loading: false
      });
    } catch {
      this.setState({
        loading: false,
        error: 'Failed to load news items. Please try again later.'
      });
    }
  }

  private _formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  public render(): React.ReactElement<IHeadlineNewsProps> {
    const { title } = this.props;
    const { newsItems, loading, error } = this.state;

    return (
      <section className={styles.headlineNews}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}

          {loading && (
            <div className={styles.loading}>
              <Spinner size={SpinnerSize.large} label="Loading news..." />
            </div>
          )}

          {error && (
            <MessageBar messageBarType={MessageBarType.error} className={styles.error}>
              {error}
            </MessageBar>
          )}

          {!loading && !error && newsItems.length === 0 && (
            <div className={styles.empty}>
              No headline news available at this time.
            </div>
          )}

          {!loading && !error && newsItems.length > 0 && (
            <div className={styles.newsGrid}>
              {newsItems.map((item) => (
                <article key={item.id} className={styles.newsCard}>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className={styles.newsImage}
                    />
                  )}
                  <div className={styles.newsContent}>
                    <h3 className={styles.newsTitle}>
                      <a href="#">{item.title}</a>
                    </h3>
                    <p className={styles.newsDescription}>{item.description}</p>
                    <div className={styles.newsMeta}>
                      <span>{item.category}</span>
                      <span>•</span>
                      <span>{this._formatDate(item.publishedDate)}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
