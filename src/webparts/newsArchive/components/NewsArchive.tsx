import * as React from 'react';
import styles from '../NewsArchiveWebPart.module.scss';
import type { INewsArchiveProps } from './INewsArchiveProps';
import { Icon } from '@fluentui/react';

interface INewsItemLocal {
  id: number;
  title: string;
  description: string;
  publishedDate: Date;
  category: string;
  isHeadline: boolean;
}

interface IState { news: INewsItemLocal[]; filteredNews: INewsItemLocal[]; currentPage: number; selectedCategory: string; searchQuery: string; }
const categories = ['All', 'Announcement', 'Event', 'Product', 'CSR', 'Financial'];

export default class NewsArchive extends React.Component<INewsArchiveProps, IState> {
  constructor(props: INewsArchiveProps) {
    super(props);
    this.state = { news: [], filteredNews: [], currentPage: 1, selectedCategory: 'All', searchQuery: '' };
  }

  public componentDidMount(): void {
    const mockNews: INewsItemLocal[] = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1, title: `News Article ${i + 1}`, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
      publishedDate: new Date(Date.now() - i * 86400000 * 7), category: categories[1 + (i % 5)], isHeadline: i < 3
    }));
    this.setState({ news: mockNews, filteredNews: mockNews });
  }

  private _filterNews = (): void => {
    const { news, selectedCategory, searchQuery } = this.state;
    let filtered = news;
    if (selectedCategory !== 'All') filtered = filtered.filter(n => n.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));
    this.setState({ filteredNews: filtered, currentPage: 1 });
  }

  public render(): React.ReactElement<INewsArchiveProps> {
    const { title, itemsPerPage } = this.props;
    const { filteredNews, currentPage, selectedCategory, searchQuery } = this.state;
    const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
    const paginatedNews = filteredNews.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
      <section className={styles.newsArchive}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.filterBar}>
          <select className={styles.filterSelect} value={selectedCategory} onChange={e => this.setState({ selectedCategory: e.target.value }, this._filterNews)}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="text" className={styles.searchInput} placeholder="Search news..." value={searchQuery} onChange={e => this.setState({ searchQuery: e.target.value }, this._filterNews)} />
        </div>
        <div className={styles.newsList}>
          {paginatedNews.map(item => (
            <article key={item.id} className={styles.newsItem}>
              <div className={styles.newsImage}><Icon iconName="News" /></div>
              <div className={styles.newsContent}>
                <div className={styles.newsCategory}>{item.category}</div>
                <h3 className={styles.newsTitle}><a href="#">{item.title}</a></h3>
                <p className={styles.newsDescription}>{item.description}</p>
                <div className={styles.newsMeta}>{item.publishedDate.toLocaleDateString()}</div>
              </div>
            </article>
          ))}
        </div>
        {totalPages > 1 && (
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`} onClick={() => this.setState({ currentPage: i + 1 })}>{i + 1}</button>
            ))}
          </div>
        )}
      </section>
    );
  }
}
