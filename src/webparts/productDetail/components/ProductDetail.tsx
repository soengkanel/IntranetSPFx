import * as React from 'react';
import styles from '../ProductDetailWebPart.module.scss';
import type { IProductDetailProps } from './IProductDetailProps';
import { Icon } from '@fluentui/react';

interface IProductDetail { id: number; name: string; category: string; description: string; features: string[]; }
interface IState { product: IProductDetail | undefined; loading: boolean; }

export default class ProductDetail extends React.Component<IProductDetailProps, IState> {
  constructor(props: IProductDetailProps) {
    super(props);
    this.state = { product: undefined, loading: true };
  }

  public componentDidMount(): void {
    // TODO: Get product ID from URL params and fetch from SharePoint
    const mockProduct: IProductDetail = {
      id: 1, name: 'Platinum Savings Account', category: 'Personal Banking',
      description: 'Our Platinum Savings Account offers premium interest rates and exclusive benefits for our valued customers. Enjoy flexible access to your funds while maximizing your savings growth.',
      features: ['Competitive interest rates up to 5% p.a.', 'No minimum balance requirement', 'Free online and mobile banking', 'Free monthly statements', '24/7 customer support', 'ATM access nationwide']
    };
    this.setState({ product: mockProduct, loading: false });
  }

  public render(): React.ReactElement<IProductDetailProps> {
    const { product, loading } = this.state;
    if (loading || !product) return <div>Loading...</div>;

    return (
      <section className={styles.productDetail}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href="#">Products</a> / <a href="#">{product.category}</a> / {product.name}
          </div>
          <div className={styles.productLayout}>
            <div className={styles.productImage}><Icon iconName="Product" /></div>
            <div className={styles.productInfo}>
              <div className={styles.productCategory}>{product.category}</div>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.features}>
                <div className={styles.featuresTitle}>Key Features</div>
                <ul className={styles.featuresList}>
                  {product.features.map((feature, idx) => <li key={idx}>{feature}</li>)}
                </ul>
              </div>
              <button className={styles.ctaButton}>Learn More</button>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
