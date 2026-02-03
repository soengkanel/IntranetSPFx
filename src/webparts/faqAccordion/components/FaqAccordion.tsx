import * as React from 'react';
import styles from '../FaqAccordionWebPart.module.scss';
import type { IFaqAccordionProps } from './IFaqAccordionProps';
import { Icon } from '@fluentui/react';

interface IFaqItemLocal {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
}

interface IState { faqs: IFaqItemLocal[]; expandedIds: Record<number, boolean>; loading: boolean; }

export default class FaqAccordion extends React.Component<IFaqAccordionProps, IState> {
  constructor(props: IFaqAccordionProps) {
    super(props);
    this.state = { faqs: [], expandedIds: {}, loading: true };
  }

  public componentDidMount(): void {
    const mockFaqs: IFaqItemLocal[] = [
      { id: 1, question: 'How do I apply for annual leave?', answer: 'You can apply for annual leave through the HR Portal. Navigate to Leave Management and submit your request with the desired dates.', category: 'HR', order: 1, isActive: true },
      { id: 2, question: 'What is the IT support contact?', answer: 'For IT support, please email itsupport@clientbank.com or call extension 1234. Support hours are Monday to Friday, 8 AM to 6 PM.', category: 'IT', order: 2, isActive: true },
      { id: 3, question: 'How do I submit expense claims?', answer: 'Expense claims can be submitted through the Finance Portal. Attach receipts and submit for manager approval.', category: 'Finance', order: 3, isActive: true },
      { id: 4, question: 'Where can I find company policies?', answer: 'All company policies are available in the Policies section of the intranet. You can also find them in the HR Portal under Documents.', category: 'General', order: 4, isActive: true },
      { id: 5, question: 'How do I update my personal information?', answer: 'Personal information can be updated through the HR Portal under My Profile section.', category: 'HR', order: 5, isActive: true }
    ];
    this.setState({ faqs: mockFaqs.slice(0, this.props.numberOfItems), loading: false });
  }

  private _toggleFaq = (id: number): void => {
    this.setState(prev => ({
      expandedIds: { ...prev.expandedIds, [id]: !prev.expandedIds[id] }
    }));
  }

  public render(): React.ReactElement<IFaqAccordionProps> {
    const { title } = this.props;
    const { faqs, expandedIds } = this.state;

    return (
      <section className={styles.faqAccordion}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.faqList}>
            {faqs.map(faq => (
              <div key={faq.id} className={styles.faqItem}>
                <button className={styles.faqQuestion} onClick={() => this._toggleFaq(faq.id)}>
                  <span>{faq.question}</span>
                  <Icon iconName="ChevronDown" className={`${styles.faqIcon} ${expandedIds[faq.id] ? styles.expanded : ''}`} />
                </button>
                <div className={`${styles.faqAnswer} ${expandedIds[faq.id] ? styles.expanded : ''}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
