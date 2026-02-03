import * as React from 'react';
import styles from '../NewsEventsCarouselWebPart.module.scss';
import type { INewsEventsCarouselProps } from './INewsEventsCarouselProps';
import { Icon, Spinner, SpinnerSize } from '@fluentui/react';

interface INewsEventItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  publishedDate: Date;
  category: string;
  type: 'news' | 'event';
  location?: string;
  eventDate?: Date;
}

interface IState {
  items: INewsEventItem[];
  currentIndex: number;
  loading: boolean;
  error: string | undefined;
}

// Mock data for News & Events
const mockNewsEvents: INewsEventItem[] = [
  {
    id: 1,
    title: 'Annual General Meeting 2025',
    description: 'Join us for the upcoming AGM to review our achievements and discuss future strategic plans for CLIENT BANK Cambodia.',
    imageUrl: '',
    publishedDate: new Date('2025-02-01'),
    category: 'Corporate Event',
    type: 'event',
    location: 'Phnom Penh Head Office',
    eventDate: new Date('2025-03-15')
  },
  {
    id: 2,
    title: 'New Branch Opening in Siem Reap',
    description: 'We are excited to announce the grand opening of our newest branch in Siem Reap, expanding our services to serve you better.',
    imageUrl: '',
    publishedDate: new Date('2025-01-28'),
    category: 'Announcement',
    type: 'news'
  },
  {
    id: 3,
    title: 'Digital Banking Platform Launch',
    description: 'Experience the future of banking with our newly redesigned mobile app featuring enhanced security and user-friendly interface.',
    imageUrl: '',
    publishedDate: new Date('2025-01-25'),
    category: 'Product Launch',
    type: 'news'
  },
  {
    id: 4,
    title: 'Staff Appreciation Day 2025',
    description: 'Celebrating our dedicated team members who make CLIENT BANK a great place to work. Join us for a day of recognition and fun.',
    imageUrl: '',
    publishedDate: new Date('2025-01-20'),
    category: 'Internal Event',
    type: 'event',
    location: 'Sokha Hotel Phnom Penh',
    eventDate: new Date('2025-02-28')
  },
  {
    id: 5,
    title: 'CSR Initiative: Community Support Program',
    description: 'Our commitment to giving back - CLIENT BANK donates educational supplies to 10 rural schools across Cambodia.',
    imageUrl: '',
    publishedDate: new Date('2025-01-15'),
    category: 'CSR',
    type: 'news'
  },
  {
    id: 6,
    title: 'Q4 2024 Financial Results',
    description: 'CLIENT BANK reports strong Q4 performance with 15% growth in deposits and expanded loan portfolio across all segments.',
    imageUrl: '',
    publishedDate: new Date('2025-01-10'),
    category: 'Financial News',
    type: 'news'
  },
  {
    id: 7,
    title: 'Customer Appreciation Week',
    description: 'Special promotions and rewards for our valued customers. Visit any branch to learn about exclusive offers.',
    imageUrl: '',
    publishedDate: new Date('2025-01-05'),
    category: 'Promotion',
    type: 'event',
    location: 'All Branches',
    eventDate: new Date('2025-02-10')
  }
];

export default class NewsEventsCarousel extends React.Component<INewsEventsCarouselProps, IState> {
  private _autoPlayTimer: number | undefined;

  constructor(props: INewsEventsCarouselProps) {
    super(props);
    this.state = {
      items: [],
      currentIndex: 0,
      loading: true,
      error: undefined
    };
  }

  public componentDidMount(): void {
    this._loadItems().catch(() => undefined);
  }

  public componentWillUnmount(): void {
    this._stopAutoPlay();
  }

  public componentDidUpdate(prevProps: INewsEventsCarouselProps): void {
    if (prevProps.numberOfItems !== this.props.numberOfItems) {
      this._loadItems().catch(() => undefined);
    }
  }

  private async _loadItems(): Promise<void> {
    try {
      this.setState({ loading: true, error: undefined });
      this._stopAutoPlay();

      // TODO: Replace with actual SharePoint API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const items = mockNewsEvents.slice(0, this.props.numberOfItems);

      this.setState({
        items,
        currentIndex: 0,
        loading: false
      }, () => {
        if (items.length > 1) {
          this._startAutoPlay();
        }
      });
    } catch {
      this.setState({
        loading: false,
        error: 'Failed to load news and events. Please try again later.'
      });
    }
  }

  private _startAutoPlay(): void {
    if (this._autoPlayTimer) return;
    this._autoPlayTimer = window.setInterval(() => {
      this._goToNext();
    }, this.props.autoPlayInterval || 5000);
  }

  private _stopAutoPlay(): void {
    if (this._autoPlayTimer) {
      window.clearInterval(this._autoPlayTimer);
      this._autoPlayTimer = undefined;
    }
  }

  private _goToNext = (): void => {
    this.setState(prev => ({
      currentIndex: (prev.currentIndex + 1) % prev.items.length
    }));
  }

  private _goToPrev = (): void => {
    this.setState(prev => ({
      currentIndex: prev.currentIndex === 0 ? prev.items.length - 1 : prev.currentIndex - 1
    }));
  }

  private _goToSlide = (index: number): void => {
    this._stopAutoPlay();
    this.setState({ currentIndex: index }, () => {
      this._startAutoPlay();
    });
  }

  private _formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  private _getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Corporate Event': 'Event',
      'Internal Event': 'Group',
      'Announcement': 'Megaphone',
      'Product Launch': 'Rocket',
      'CSR': 'Heart',
      'Financial News': 'Chart',
      'Promotion': 'Gift'
    };
    return iconMap[category] || 'News';
  }

  public render(): React.ReactElement<INewsEventsCarouselProps> {
    const { title } = this.props;
    const { items, currentIndex, loading, error } = this.state;

    return (
      <section className={styles.newsEventsCarousel}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Icon iconName="News" className={styles.titleIcon} />
            {title || 'News & Events'}
          </h2>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {loading && (
            <div className={styles.loading}>
              <Spinner size={SpinnerSize.large} label="Loading news & events..." />
            </div>
          )}

          {error && (
            <div className={styles.error}>
              <Icon iconName="ErrorBadge" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div className={styles.empty}>
              <Icon iconName="News" />
              <span>No news or events available at this time.</span>
            </div>
          )}

          {!loading && !error && items.length > 0 && (
            <>
              <div className={styles.carousel}>
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                  >
                    <div className={styles.slideBackground}>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} />
                      ) : (
                        <div className={styles.placeholderBg}>
                          <Icon iconName={this._getCategoryIcon(item.category)} />
                        </div>
                      )}
                    </div>
                    <div className={styles.slideOverlay}>
                      <div className={styles.slideCategory}>
                        <Icon iconName={this._getCategoryIcon(item.category)} />
                        <span>{item.category}</span>
                        {item.type === 'event' && <span className={styles.eventBadge}>Event</span>}
                      </div>
                      <h3 className={styles.slideTitle}>{item.title}</h3>
                      <p className={styles.slideDescription}>{item.description}</p>
                      <div className={styles.slideMeta}>
                        <span className={styles.metaItem}>
                          <Icon iconName="Calendar" />
                          {this._formatDate(item.publishedDate)}
                        </span>
                        {item.type === 'event' && item.eventDate && (
                          <span className={styles.metaItem}>
                            <Icon iconName="EventDate" />
                            Event: {this._formatDate(item.eventDate)}
                          </span>
                        )}
                        {item.location && (
                          <span className={styles.metaItem}>
                            <Icon iconName="MapPin" />
                            {item.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Navigation Buttons */}
                <button
                  className={`${styles.navButton} ${styles.prev}`}
                  onClick={this._goToPrev}
                  aria-label="Previous slide"
                >
                  <Icon iconName="ChevronLeft" />
                </button>
                <button
                  className={`${styles.navButton} ${styles.next}`}
                  onClick={this._goToNext}
                  aria-label="Next slide"
                >
                  <Icon iconName="ChevronRight" />
                </button>
              </div>

              {/* Dots Navigation */}
              <div className={styles.dots}>
                {items.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => this._goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Counter */}
              <div className={styles.counter}>
                {currentIndex + 1} / {items.length}
              </div>
            </>
          )}
        </div>
      </section>
    );
  }
}
