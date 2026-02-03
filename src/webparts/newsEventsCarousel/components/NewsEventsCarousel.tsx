import * as React from 'react';
import styles from '../NewsEventsCarouselWebPart.module.scss';
import type { INewsEventsCarouselProps } from './INewsEventsCarouselProps';
import { Icon } from '@fluentui/react';

interface INewsItemLocal {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  publishedDate: Date;
  category: string;
  isHeadline: boolean;
}

interface IState { items: INewsItemLocal[]; currentIndex: number; loading: boolean; }

export default class NewsEventsCarousel extends React.Component<INewsEventsCarouselProps, IState> {
  private _autoPlayTimer: number | undefined;

  constructor(props: INewsEventsCarouselProps) {
    super(props);
    this.state = { items: [], currentIndex: 0, loading: true };
  }

  public componentDidMount(): void {
    this._loadItems();
    this._startAutoPlay();
  }

  public componentWillUnmount(): void {
    this._stopAutoPlay();
  }

  private _loadItems(): void {
    const mockItems: INewsItemLocal[] = [
      { id: 1, title: 'Annual General Meeting 2024', description: 'Join us for the upcoming AGM to review our achievements and future plans.', imageUrl: '', publishedDate: new Date(), category: 'Event', isHeadline: true },
      { id: 2, title: 'New Branch Opening in Siem Reap', description: 'We are excited to announce the opening of our newest branch.', imageUrl: '', publishedDate: new Date(), category: 'Announcement', isHeadline: true },
      { id: 3, title: 'Digital Banking Launch', description: 'Experience the future of banking with our new mobile app.', imageUrl: '', publishedDate: new Date(), category: 'Product', isHeadline: true },
      { id: 4, title: 'Staff Appreciation Day', description: 'Celebrating our dedicated team members.', imageUrl: '', publishedDate: new Date(), category: 'Event', isHeadline: true },
      { id: 5, title: 'CSR Initiative: Community Support', description: 'Our commitment to giving back to the community.', imageUrl: '', publishedDate: new Date(), category: 'CSR', isHeadline: true }
    ];
    this.setState({ items: mockItems.slice(0, this.props.numberOfItems), loading: false });
  }

  private _startAutoPlay(): void {
    this._autoPlayTimer = window.setInterval(() => { this._goToNext(); }, this.props.autoPlayInterval);
  }

  private _stopAutoPlay(): void {
    if (this._autoPlayTimer) { window.clearInterval(this._autoPlayTimer); }
  }

  private _goToNext = (): void => {
    this.setState(prev => ({ currentIndex: (prev.currentIndex + 1) % prev.items.length }));
  }

  private _goToPrev = (): void => {
    this.setState(prev => ({ currentIndex: prev.currentIndex === 0 ? prev.items.length - 1 : prev.currentIndex - 1 }));
  }

  private _goToSlide = (index: number): void => {
    this.setState({ currentIndex: index });
  }

  public render(): React.ReactElement<INewsEventsCarouselProps> {
    const { title } = this.props;
    const { items, currentIndex } = this.state;

    return (
      <section className={styles.newsEventsCarousel}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.carousel}>
            {items.map((item, index) => (
              <div key={item.id} className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
                style={{ backgroundImage: item.imageUrl ? `url(${item.imageUrl})` : undefined }}>
                <div className={styles.slideOverlay}>
                  <div className={styles.slideTitle}>{item.title}</div>
                  <div className={styles.slideDescription}>{item.description}</div>
                  <div className={styles.slideMeta}>{item.category} • {item.publishedDate.toLocaleDateString()}</div>
                </div>
              </div>
            ))}
            <button className={`${styles.navButton} ${styles.prev}`} onClick={this._goToPrev}><Icon iconName="ChevronLeft" /></button>
            <button className={`${styles.navButton} ${styles.next}`} onClick={this._goToNext}><Icon iconName="ChevronRight" /></button>
          </div>
          <div className={styles.dots}>
            {items.map((_, index) => (
              <button key={index} className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`} onClick={() => this._goToSlide(index)} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}
