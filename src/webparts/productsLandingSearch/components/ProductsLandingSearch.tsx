import * as React from 'react';
import styles from '../ProductsLandingSearchWebPart.module.scss';
import type { IProductsLandingSearchProps, IProduct, IProductCategory } from './IProductsLandingSearchProps';
import { Icon, Spinner, SpinnerSize } from '@fluentui/react';

interface IState {
  searchQuery: string;
  categories: IProductCategory[];
  filteredCategories: IProductCategory[];
  loading: boolean;
  error: string | undefined;
  selectedProduct: IProduct | undefined;
  viewMode: 'list' | 'detail';
}

// Mock data matching the SharePoint list structure
const mockProducts: IProduct[] = [
  // Packages and Account
  { id: 1, productName: 'Silver Package', description: 'Basic banking package for everyday needs. Perfect for customers who want essential banking services with minimal fees. Includes all standard banking features with the convenience of digital access.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• Free debit card\n• Mobile banking access\n• ATM withdrawals\n• Online transfers\n• E-statements', feesAndCharges: 'Monthly fee: $5\nATM withdrawal: Free (up to 5/month)\nInternational transfer: $10', requirement: '• Valid government-issued ID\n• Proof of address\n• Minimum initial deposit: $100', trainingMaterials: 'Silver Package Training Guide v2.1', complexity: 'Low', searchKeyWords: 'silver basic starter', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 2, productName: 'Gold Package', description: 'Premium banking with added benefits for customers seeking more value. Enhanced limits and priority service make this ideal for growing financial needs.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• Priority customer service\n• Higher transaction limits\n• Travel insurance coverage\n• Preferential exchange rates\n• Free checkbook', feesAndCharges: 'Monthly fee: $15\nATM withdrawal: Free (unlimited)\nInternational transfer: $5', requirement: '• Valid government-issued ID\n• Proof of address\n• Minimum initial deposit: $500\n• Proof of income', trainingMaterials: 'Gold Package Training Guide v2.1', complexity: 'Medium', searchKeyWords: 'gold premium priority', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 3, productName: 'World Package', description: 'Elite banking for global citizens who need seamless international banking services. Designed for frequent travelers and international business people.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• 24/7 concierge service\n• Airport lounge access\n• Global ATM fee rebates\n• Multi-currency account\n• Premium travel insurance', feesAndCharges: 'Monthly fee: $50\nAll ATM fees: Rebated\nInternational transfer: Free', requirement: '• Valid passport\n• Proof of address\n• Minimum initial deposit: $5,000\n• Income verification', trainingMaterials: 'World Package Training Guide v3.0', complexity: 'High', searchKeyWords: 'world elite global international', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 4, productName: 'Platinum Package', description: 'Ultimate banking experience with dedicated relationship management. Our most comprehensive package for high-value customers requiring personalized service.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• Dedicated relationship manager\n• Exclusive rewards program\n• Investment advisory\n• Premium credit card\n• Family banking benefits', feesAndCharges: 'Monthly fee: $100\nAll standard fees: Waived\nPriority processing: Included', requirement: '• Valid government-issued ID\n• Proof of address\n• Minimum balance: $10,000\n• Background verification', trainingMaterials: 'Platinum Package Training Guide v3.0', complexity: 'High', searchKeyWords: 'platinum ultimate vip exclusive', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 5, productName: 'Platinum Travel Package', description: 'Travel-focused platinum benefits for the frequent traveler. Combines premium banking with extensive travel perks and protections.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• Comprehensive travel insurance\n• Airport transfers\n• Hotel upgrade privileges\n• Travel booking assistance\n• Emergency travel assistance', feesAndCharges: 'Monthly fee: $75\nTravel insurance: Included\nEmergency assistance: Free', requirement: '• Valid passport\n• Proof of address\n• Minimum balance: $7,500', trainingMaterials: 'Platinum Travel Guide v2.0', complexity: 'High', searchKeyWords: 'platinum travel vacation international', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 6, productName: 'Platinum Lifestyle Package', description: 'Lifestyle rewards and perks for customers who enjoy the finer things. Perfect for those who want their banking to complement their lifestyle.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• Dining rewards (up to 20% off)\n• Shopping discounts\n• Entertainment access\n• Spa & wellness benefits\n• Golf privileges', feesAndCharges: 'Monthly fee: $80\nLifestyle benefits: Included\nReward points: 2x earning', requirement: '• Valid government-issued ID\n• Proof of address\n• Minimum balance: $8,000', trainingMaterials: 'Platinum Lifestyle Guide v2.0', complexity: 'High', searchKeyWords: 'platinum lifestyle dining shopping entertainment', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 7, productName: 'Platinum Plus Package', description: 'Enhanced platinum with wealth management services. Our most exclusive package combining premium banking with investment expertise.', customerSegment: 'Retail', productCategories: 'Packages and Account', targetMarket: 'Individual', productFeatures: '• All Platinum benefits\n• Wealth management advisory\n• Tax planning assistance\n• Estate planning consultation\n• Private banking access', feesAndCharges: 'Monthly fee: $150\nWealth advisory: Included\nAll fees: Waived', requirement: '• Valid government-issued ID\n• Proof of address\n• Minimum balance: $25,000\n• Investment profile assessment', trainingMaterials: 'Platinum Plus Guide v3.0', complexity: 'High', searchKeyWords: 'platinum plus wealth management investment', productBusinessOwnership: 'Retail Banking', status: 'Active' },

  // Savings and Term Deposits
  { id: 8, productName: 'Build Your Future', description: 'Long-term savings with competitive rates designed to help you achieve your financial goals. Ideal for planning major life events.', customerSegment: 'Retail', productCategories: 'Savings and Term Deposits', targetMarket: 'Individual', productFeatures: '• Competitive interest rates\n• Flexible terms (1-10 years)\n• Goal tracking tools\n• Automatic savings plans\n• Milestone bonuses', feesAndCharges: 'No monthly fee\nEarly withdrawal: 1% penalty\nAccount maintenance: Free', requirement: '• Valid government-issued ID\n• Minimum initial deposit: $100', trainingMaterials: 'Savings Products Guide v2.5', complexity: 'Low', searchKeyWords: 'savings future goals long-term', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 9, productName: 'Savings Plus', description: 'Enhanced savings account with bonus interest for maintaining higher balances. Earn more while keeping your funds accessible.', customerSegment: 'Retail', productCategories: 'Savings and Term Deposits', targetMarket: 'Individual', productFeatures: '• Tiered bonus interest\n• No lock-in period\n• Unlimited withdrawals\n• Online management\n• Interest compounded daily', feesAndCharges: 'No monthly fee\nNo minimum balance fee\nAll transactions: Free', requirement: '• Valid government-issued ID', trainingMaterials: 'Savings Products Guide v2.5', complexity: 'Low', searchKeyWords: 'savings plus bonus interest flexible', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 10, productName: 'Fixed Term Deposit', description: 'Guaranteed returns with fixed terms for secure, predictable growth. Lock in attractive rates for peace of mind.', customerSegment: 'Retail', productCategories: 'Savings and Term Deposits', targetMarket: 'Individual', productFeatures: '• Guaranteed fixed interest rate\n• Terms from 1-60 months\n• Interest payout options\n• Auto-renewal available\n• Certificate of deposit issued', feesAndCharges: 'No fees\nEarly withdrawal: Penalty applies\nRenewal: Free', requirement: '• Valid government-issued ID\n• Minimum deposit: $1,000', trainingMaterials: 'Term Deposit Guide v3.0', complexity: 'Low', searchKeyWords: 'fixed term deposit FD guaranteed', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 11, productName: 'Current And Savings Account', description: 'Combined current and savings functionality in one convenient account. Automatic sweep ensures your money works harder.', customerSegment: 'Retail', productCategories: 'Savings and Term Deposits', targetMarket: 'Individual', productFeatures: '• Dual account functionality\n• Automatic sweep feature\n• Checkbook facility\n• Overdraft available\n• Real-time balance alerts', feesAndCharges: 'Monthly fee: $3\nMinimum balance: $500\nOverdraft interest: 12% p.a.', requirement: '• Valid government-issued ID\n• Proof of address\n• Proof of income', trainingMaterials: 'CASA Product Guide v2.0', complexity: 'Medium', searchKeyWords: 'CASA current savings combined sweep', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 12, productName: 'Minor Account', description: 'Savings account designed for children to learn financial responsibility. Building good money habits from an early age.', customerSegment: 'Retail', productCategories: 'Savings and Term Deposits', targetMarket: 'Individual', productFeatures: '• No minimum balance\n• Financial education resources\n• Parental controls\n• Birthday bonuses\n• Graduation rewards', feesAndCharges: 'No fees\nAll services: Free for minors', requirement: '• Guardian valid ID\n• Child birth certificate\n• Child must be under 18', trainingMaterials: 'Junior Banking Guide v1.5', complexity: 'Low', searchKeyWords: 'minor child kids junior youth savings', productBusinessOwnership: 'Retail Banking', status: 'Active' },

  // Lending
  { id: 13, productName: 'Home Loan', description: 'Finance your dream home with competitive rates and flexible repayment options. Making home ownership achievable for everyone.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Competitive interest rates\n• Up to 30 years tenure\n• Flexible repayment options\n• Top-up facility available\n• Balance transfer option', feesAndCharges: 'Processing fee: 1% of loan amount\nPrepayment: No penalty after 1 year\nLate payment: 2% of EMI', requirement: '• Income proof (last 6 months)\n• Property documents\n• KYC documents\n• Age: 21-60 years', trainingMaterials: 'Home Loan Product Guide v4.0', complexity: 'High', searchKeyWords: 'home loan mortgage housing property', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 14, productName: 'Car Loan', description: 'Drive your dream car today with quick approval and attractive rates. New and used car financing available.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Quick approval (24-48 hours)\n• Up to 7 years tenure\n• Up to 90% financing\n• New and used cars\n• Dealer partnerships', feesAndCharges: 'Processing fee: 0.5% of loan amount\nPrepayment: 2% penalty\nDocumentation: $50', requirement: '• Income proof\n• Vehicle quotation/invoice\n• KYC documents\n• Age: 21-65 years', trainingMaterials: 'Auto Loan Guide v3.0', complexity: 'Medium', searchKeyWords: 'car loan auto vehicle finance', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 15, productName: 'Secured Personal Loan', description: 'Loan against your assets at preferential rates. Unlock the value of your investments without selling them.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Lower interest rates\n• Higher loan amounts\n• Loan against FD/property/gold\n• Flexible tenure\n• Quick disbursement', feesAndCharges: 'Processing fee: 0.5%\nCollateral valuation: At cost\nPrepayment: No penalty', requirement: '• Collateral documents\n• Income proof\n• KYC documents\n• Collateral valuation', trainingMaterials: 'Secured Lending Guide v2.5', complexity: 'Medium', searchKeyWords: 'secured personal loan collateral assets', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 16, productName: 'Unsecured Personal Loan', description: 'Quick personal loan without collateral for your immediate needs. Fast disbursement when you need it most.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• No collateral needed\n• Fast disbursement (same day)\n• Minimal documentation\n• Online application\n• Flexible use of funds', feesAndCharges: 'Processing fee: 2%\nPrepayment: 3% penalty\nLate payment: 2% per month', requirement: '• Income proof\n• Employment verification\n• KYC documents\n• Credit score: 650+', trainingMaterials: 'Personal Loan Guide v3.0', complexity: 'Medium', searchKeyWords: 'unsecured personal loan quick instant', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 17, productName: 'Personal Overdraft', description: 'Flexible credit line for emergencies and unexpected expenses. Pay interest only on what you use.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Pay interest only on used amount\n• Revolving credit line\n• No fixed EMI\n• Instant access\n• Auto-replenishment', feesAndCharges: 'Annual fee: $25\nInterest: 15% p.a. on utilized amount\nNon-utilization: No charge', requirement: '• Existing account (6+ months)\n• Good credit history\n• Stable income proof', trainingMaterials: 'Overdraft Facility Guide v2.0', complexity: 'Medium', searchKeyWords: 'overdraft credit line OD flexible', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 18, productName: 'Emergency Loan', description: 'Quick funds for urgent needs with minimal documentation. When time matters most.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Same day approval\n• Minimal documentation\n• Online application\n• Short tenure (up to 12 months)\n• No collateral required', feesAndCharges: 'Processing fee: 3%\nInterest: Higher than standard\nPrepayment: Free', requirement: '• Valid ID\n• Existing bank account\n• Basic income verification', trainingMaterials: 'Emergency Lending Guide v1.5', complexity: 'Low', searchKeyWords: 'emergency loan urgent quick instant', productBusinessOwnership: 'Retail Banking', status: 'Active' },
  { id: 19, productName: 'Advance', description: 'Salary advance for employees of partner companies. Bridge the gap until payday.', customerSegment: 'Retail', productCategories: 'Lending', targetMarket: 'Individual', productFeatures: '• Up to 2 months salary\n• Quick processing\n• Auto deduction from salary\n• No additional documentation\n• Renewable facility', feesAndCharges: 'Flat fee: $10 per advance\nInterest: Built into fee\nNo hidden charges', requirement: '• Employment with partner company\n• Salary account with bank\n• Minimum 6 months employment', trainingMaterials: 'Salary Advance Guide v1.0', complexity: 'Low', searchKeyWords: 'advance salary payday employee', productBusinessOwnership: 'Retail Banking', status: 'Active' },

  // Cards
  { id: 20, productName: 'Coming Soon', description: 'Exciting new card products are being developed. Stay tuned for our innovative credit and debit card offerings.', customerSegment: 'Retail', productCategories: 'Cards', targetMarket: 'Individual', productFeatures: '• Credit cards\n• Rewards programs\n• Contactless payments\n• Virtual cards\n• Premium card tiers', feesAndCharges: 'To be announced', requirement: 'To be announced', trainingMaterials: 'Coming Soon', complexity: 'Low', searchKeyWords: 'cards credit debit rewards', productBusinessOwnership: 'Retail Banking', status: 'Coming Soon' },

  // Digital and Banking Payments
  { id: 21, productName: 'Coming Soon', description: 'Modern digital payment solutions are on the way. Experience the future of banking with our upcoming digital services.', customerSegment: 'Retail', productCategories: 'Digital and Banking Payments', targetMarket: 'Individual', productFeatures: '• Mobile wallet\n• QR payments\n• International remittance\n• Bill payments\n• Scheduled transfers', feesAndCharges: 'To be announced', requirement: 'To be announced', trainingMaterials: 'Coming Soon', complexity: 'Low', searchKeyWords: 'digital payments mobile wallet QR', productBusinessOwnership: 'Retail Banking', status: 'Coming Soon' },

  // Protection and Security
  { id: 22, productName: 'Coming Soon', description: 'Comprehensive insurance and protection products coming soon. Protect what matters most to you.', customerSegment: 'Retail', productCategories: 'Protection and Security', targetMarket: 'Individual', productFeatures: '• Life insurance\n• Health insurance\n• Property insurance\n• Travel insurance\n• Investment protection', feesAndCharges: 'To be announced', requirement: 'To be announced', trainingMaterials: 'Coming Soon', complexity: 'Low', searchKeyWords: 'protection insurance security coverage', productBusinessOwnership: 'Retail Banking', status: 'Coming Soon' },
];

const categoryOrder = [
  'Packages and Account',
  'Savings and Term Deposits',
  'Lending',
  'Cards',
  'Digital and Banking Payments',
  'Protection and Security'
];

export default class ProductsLandingSearch extends React.Component<IProductsLandingSearchProps, IState> {
  constructor(props: IProductsLandingSearchProps) {
    super(props);
    this.state = {
      searchQuery: '',
      categories: [],
      filteredCategories: [],
      loading: true,
      error: undefined,
      selectedProduct: undefined,
      viewMode: 'list'
    };
  }

  public componentDidMount(): void {
    this._loadProducts().catch(() => undefined);
  }

  private async _loadProducts(): Promise<void> {
    try {
      this.setState({ loading: true, error: undefined });

      // TODO: Replace with actual SharePoint API call
      await new Promise(resolve => setTimeout(resolve, 500));

      const groupedCategories = this._groupProductsByCategory(mockProducts);
      this.setState({
        categories: groupedCategories,
        filteredCategories: groupedCategories,
        loading: false
      });
    } catch {
      this.setState({
        loading: false,
        error: 'Failed to load products. Please try again later.'
      });
    }
  }

  private _groupProductsByCategory(products: IProduct[]): IProductCategory[] {
    const categoryMap = new Map<string, IProduct[]>();
    categoryOrder.forEach(cat => categoryMap.set(cat, []));

    products.forEach(product => {
      const existing = categoryMap.get(product.productCategories) || [];
      existing.push(product);
      categoryMap.set(product.productCategories, existing);
    });

    return categoryOrder.map(name => ({
      name,
      products: categoryMap.get(name) || [],
      isExpanded: true
    }));
  }

  private _handleSearch = (query: string): void => {
    this.setState({ searchQuery: query });

    if (!query.trim()) {
      this.setState({ filteredCategories: this.state.categories });
      return;
    }

    const searchLower = query.toLowerCase();
    const filtered = this.state.categories.map(category => ({
      ...category,
      products: category.products.filter(product =>
        product.productName.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.searchKeyWords.toLowerCase().includes(searchLower) ||
        product.productFeatures.toLowerCase().includes(searchLower)
      )
    })).filter(category => category.products.length > 0);

    this.setState({ filteredCategories: filtered });
  }

  private _toggleCategory = (categoryName: string): void => {
    this.setState(prevState => ({
      filteredCategories: prevState.filteredCategories.map(cat =>
        cat.name === categoryName ? { ...cat, isExpanded: !cat.isExpanded } : cat
      )
    }));
  }

  private _openProductDetail = (product: IProduct): void => {
    this.setState({ selectedProduct: product, viewMode: 'detail' });
  }

  private _goBack = (): void => {
    this.setState({ selectedProduct: undefined, viewMode: 'list' });
  }

  private _isSubProduct(productName: string): boolean {
    return productName.startsWith('Platinum ') && productName !== 'Platinum Package';
  }

  private _renderListView(): React.ReactElement {
    const { title, searchPlaceholder } = this.props;
    const { searchQuery, filteredCategories, loading, error } = this.state;

    return (
      <>
        {/* Header with search */}
        <div className={styles.header}>
          <h1 className={styles.title}>{title || 'RETAIL BANKING OFFERS'}</h1>
          <div className={styles.searchBox}>
            <Icon iconName="Search" className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder || 'Type here to get results in seconds..'}
              value={searchQuery}
              onChange={e => this._handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>
          {loading && (
            <div className={styles.loading}>
              <Spinner size={SpinnerSize.large} label="Loading products..." />
            </div>
          )}

          {error && (
            <div className={styles.error}>{error}</div>
          )}

          {!loading && !error && (
            <div className={styles.categoriesGrid}>
              {filteredCategories.map(category => (
                <div key={category.name} className={styles.categoryCard}>
                  <button
                    className={styles.categoryHeader}
                    onClick={() => this._toggleCategory(category.name)}
                    aria-expanded={category.isExpanded}
                  >
                    <span className={styles.categoryTitle}>{category.name}</span>
                    <Icon
                      iconName={category.isExpanded ? 'ChevronUp' : 'ChevronDown'}
                      className={styles.chevron}
                    />
                  </button>
                  {category.isExpanded && (
                    <div className={styles.categoryContent}>
                      {category.products.map(product => (
                        <button
                          key={product.id}
                          className={`${styles.productItem} ${this._isSubProduct(product.productName) ? styles.subProduct : ''}`}
                          onClick={() => this._openProductDetail(product)}
                        >
                          {product.productName}
                        </button>
                      ))}
                      {category.products.length === 0 && (
                        <div className={styles.noProducts}>No products available</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }

  private _renderDetailView(): React.ReactElement {
    const { selectedProduct } = this.state;

    if (!selectedProduct) {
      return <div>Product not found</div>;
    }

    return (
      <>
        {/* Detail Header */}
        <div className={styles.detailHeader}>
          <button className={styles.backButton} onClick={this._goBack}>
            <Icon iconName="ChevronLeft" />
            <span>Back to Products</span>
          </button>
          <h1 className={styles.detailTitle}>{selectedProduct.productName}</h1>
          <div className={styles.detailCategory}>
            <Icon iconName="Tag" />
            <span>{selectedProduct.productCategories}</span>
          </div>
        </div>

        {/* Detail Content */}
        <div className={styles.detailContent}>
          {/* Status Badge */}
          <div className={styles.statusBadge} data-status={selectedProduct.status.toLowerCase().replace(' ', '-')}>
            {selectedProduct.status}
          </div>

          {/* Description Section */}
          <div className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>
              <Icon iconName="Info" />
              Description
            </h2>
            <p className={styles.description}>{selectedProduct.description}</p>
          </div>

          {/* Quick Info Grid */}
          <div className={styles.quickInfoGrid}>
            <div className={styles.quickInfoItem}>
              <div className={styles.quickInfoLabel}>Customer Segment</div>
              <div className={styles.quickInfoValue}>{selectedProduct.customerSegment}</div>
            </div>
            <div className={styles.quickInfoItem}>
              <div className={styles.quickInfoLabel}>Target Market</div>
              <div className={styles.quickInfoValue}>{selectedProduct.targetMarket}</div>
            </div>
            <div className={styles.quickInfoItem}>
              <div className={styles.quickInfoLabel}>Complexity</div>
              <div className={styles.quickInfoValue}>{selectedProduct.complexity}</div>
            </div>
            <div className={styles.quickInfoItem}>
              <div className={styles.quickInfoLabel}>Business Ownership</div>
              <div className={styles.quickInfoValue}>{selectedProduct.productBusinessOwnership}</div>
            </div>
          </div>

          {/* Product Features */}
          <div className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>
              <Icon iconName="CheckList" />
              Product Features
            </h2>
            <div className={styles.featuresList}>
              {selectedProduct.productFeatures.split('\n').map((feature, index) => (
                <div key={index} className={styles.featureItem}>{feature}</div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className={styles.twoColumnGrid}>
            {/* Fees and Charges */}
            <div className={styles.detailSection}>
              <h2 className={styles.sectionTitle}>
                <Icon iconName="Money" />
                Fees and Charges
              </h2>
              <div className={styles.infoBox}>
                {selectedProduct.feesAndCharges.split('\n').map((fee, index) => (
                  <div key={index} className={styles.infoLine}>{fee}</div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className={styles.detailSection}>
              <h2 className={styles.sectionTitle}>
                <Icon iconName="ClipboardList" />
                Requirements
              </h2>
              <div className={styles.infoBox}>
                {selectedProduct.requirement.split('\n').map((req, index) => (
                  <div key={index} className={styles.infoLine}>{req}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Materials */}
          {selectedProduct.trainingMaterials && selectedProduct.trainingMaterials !== 'Coming Soon' && (
            <div className={styles.detailSection}>
              <h2 className={styles.sectionTitle}>
                <Icon iconName="Education" />
                Training Materials
              </h2>
              <div className={styles.trainingMaterials}>
                <Icon iconName="PDF" />
                <span>{selectedProduct.trainingMaterials}</span>
              </div>
            </div>
          )}

          {/* Keywords */}
          <div className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>
              <Icon iconName="Search" />
              Search Keywords
            </h2>
            <div className={styles.keywordTags}>
              {selectedProduct.searchKeyWords.split(' ').map((keyword, index) => (
                <span key={index} className={styles.keywordTag}>{keyword}</span>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  public render(): React.ReactElement<IProductsLandingSearchProps> {
    const { viewMode } = this.state;

    return (
      <section className={styles.productsLandingSearch}>
        {viewMode === 'list' ? this._renderListView() : this._renderDetailView()}
      </section>
    );
  }
}
