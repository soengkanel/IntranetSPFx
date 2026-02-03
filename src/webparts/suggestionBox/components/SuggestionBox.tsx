import * as React from 'react';
import styles from '../SuggestionBoxWebPart.module.scss';
import type { ISuggestionBoxProps } from './ISuggestionBoxProps';

interface IState { suggestionTitle: string; suggestionDescription: string; submitting: boolean; submitted: boolean; error: string | undefined; }

export default class SuggestionBox extends React.Component<ISuggestionBoxProps, IState> {
  constructor(props: ISuggestionBoxProps) {
    super(props);
    this.state = { suggestionTitle: '', suggestionDescription: '', submitting: false, submitted: false, error: undefined };
  }

  private _handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const { suggestionTitle, suggestionDescription } = this.state;

    if (!suggestionTitle.trim() || !suggestionDescription.trim()) {
      this.setState({ error: 'Please fill in all fields.' });
      return;
    }

    this.setState({ submitting: true, error: undefined });

    try {
      // TODO: Replace with actual SharePoint API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitting suggestion:', { title: suggestionTitle, description: suggestionDescription });

      this.setState({ submitted: true, submitting: false, suggestionTitle: '', suggestionDescription: '' });

      setTimeout(() => this.setState({ submitted: false }), 5000);
    } catch {
      this.setState({ submitting: false, error: 'Failed to submit suggestion. Please try again.' });
    }
  }

  public render(): React.ReactElement<ISuggestionBoxProps> {
    const { title } = this.props;
    const { suggestionTitle, suggestionDescription, submitting, submitted, error } = this.state;

    return (
      <section className={styles.suggestionBox}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}

          {submitted ? (
            <div className={styles.successMessage}>
              Thank you for your suggestion! We appreciate your feedback.
            </div>
          ) : (
            <form className={styles.form} onSubmit={this._handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>Title</label>
                <input type="text" className={styles.input} value={suggestionTitle}
                  onChange={e => this.setState({ suggestionTitle: e.target.value })}
                  placeholder="Enter a brief title for your suggestion" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} value={suggestionDescription}
                  onChange={e => this.setState({ suggestionDescription: e.target.value })}
                  placeholder="Describe your suggestion in detail..." />
              </div>
              {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
              <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Suggestion'}
              </button>
            </form>
          )}
        </div>
      </section>
    );
  }
}
