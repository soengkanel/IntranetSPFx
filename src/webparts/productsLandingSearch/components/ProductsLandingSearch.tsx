import * as React from 'react';
import styles from '../ProductsLandingSearchWebPart.module.scss';
import type { IProductsLandingSearchProps } from './IProductsLandingSearchProps';
import { Icon } from '@fluentui/react';

const categories = ['Personal Banking', 'Business Banking', 'Loans', 'Cards', 'Insurance', 'Investments'];

interface IState { searchQuery: string; }

export default class ProductsLandingSearch extends React.Component<IProductsLandingSearchProps, IState> {
  constructor(props: IProductsLandingSearchProps) {
    super(props);
    this.state = { searchQuery: '' };
  }

  private _handleSearch = (): void => {
    // TODO: Navigate to products list with search query
    console.log('Searching for:', this.state.searchQuery);
  }

  private _handleCategoryClick = (category: string): void => {
    // TODO: Navigate to products list with category filter
    console.log('Category selected:', category);
  }

  public render(): React.ReactElement<IProductsLandingSearchProps> {
    const { title, searchPlaceholder } = this.props;
    const { searchQuery } = this.state;

    return (
      <section className={styles.productsLandingSearch}>
        <div className={styles.container}>
          {title && <h1 className={styles.title}>{title}</h1>}
          <div className={styles.searchBox}>
            <input type="text" className={styles.searchInput} placeholder={searchPlaceholder}
              value={searchQuery} onChange={e => this.setState({ searchQuery: e.target.value })}
              onKeyPress={e => e.key === 'Enter' && this._handleSearch()} />
            <button className={styles.searchButton} onClick={this._handleSearch}><Icon iconName="Search" /></button>
          </div>
          <div className={styles.categories}>
            {categories.map(cat => (
              <button key={cat} className={styles.categoryChip} onClick={() => this._handleCategoryClick(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
