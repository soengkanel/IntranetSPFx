import * as React from 'react';
import styles from '../ProductsListFilterWebPart.module.scss';
import type { IProductsListFilterProps } from './IProductsListFilterProps';
import { Icon } from '@fluentui/react';

interface IProductLocal {
  id: number;
  productName: string;
  description: string;
  category: string;
  isActive: boolean;
  isFeatured: boolean;
  order: number;
}

interface IState { products: IProductLocal[]; filteredProducts: IProductLocal[]; selectedCategory: string; searchQuery: string; loading: boolean; }

const categories = ['All', 'Personal Banking', 'Business Banking', 'Loans', 'Cards', 'Insurance'];

export default class ProductsListFilter extends React.Component<IProductsListFilterProps, IState> {
  constructor(props: IProductsListFilterProps) {
    super(props);
    this.state = { products: [], filteredProducts: [], selectedCategory: 'All', searchQuery: '', loading: true };
  }

  public componentDidMount(): void {
    const mockProducts: IProductLocal[] = [
      { id: 1, productName: 'Savings Account', description: 'Flexible savings with competitive interest rates.', category: 'Personal Banking', isActive: true, isFeatured: true, order: 1 },
      { id: 2, productName: 'Current Account', description: 'Everyday banking for your daily transactions.', category: 'Personal Banking', isActive: true, isFeatured: false, order: 2 },
      { id: 3, productName: 'Business Loan', description: 'Financing solutions for your business growth.', category: 'Loans', isActive: true, isFeatured: true, order: 3 },
      { id: 4, productName: 'Home Loan', description: 'Make your dream home a reality.', category: 'Loans', isActive: true, isFeatured: false, order: 4 },
      { id: 5, productName: 'Platinum Credit Card', description: 'Premium rewards and exclusive benefits.', category: 'Cards', isActive: true, isFeatured: true, order: 5 },
      { id: 6, productName: 'Business Account', description: 'Comprehensive banking for businesses.', category: 'Business Banking', isActive: true, isFeatured: false, order: 6 }
    ];
    this.setState({ products: mockProducts, filteredProducts: mockProducts, loading: false });
  }

  private _filterProducts = (): void => {
    const { products, selectedCategory, searchQuery } = this.state;
    let filtered = products;
    if (selectedCategory !== 'All') filtered = filtered.filter(p => p.category === selectedCategory);
    if (searchQuery) filtered = filtered.filter(p => p.productName.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    this.setState({ filteredProducts: filtered });
  }

  private _handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({ selectedCategory: e.target.value }, this._filterProducts);
  }

  private _handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: e.target.value }, this._filterProducts);
  }

  public render(): React.ReactElement<IProductsListFilterProps> {
    const { title } = this.props;
    const { filteredProducts, selectedCategory, searchQuery } = this.state;

    return (
      <section className={styles.productsListFilter}>
        {title && <h2 className={styles.title}>{title}</h2>}
        <div className={styles.filterBar}>
          <select className={styles.filterSelect} value={selectedCategory} onChange={this._handleCategoryChange}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="text" className={styles.searchInput} placeholder="Search products..." value={searchQuery} onChange={this._handleSearchChange} />
        </div>
        <div className={styles.productsGrid}>
          {filteredProducts.map(product => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}><Icon iconName="Product" /></div>
              <div className={styles.productContent}>
                <div className={styles.productCategory}>{product.category}</div>
                <div className={styles.productName}>{product.productName}</div>
                <div className={styles.productDescription}>{product.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
}
