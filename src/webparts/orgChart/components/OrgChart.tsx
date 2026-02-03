import * as React from 'react';
import styles from '../OrgChartWebPart.module.scss';
import type { IOrgChartProps } from './IOrgChartProps';
import { Icon } from '@fluentui/react';

interface IPerson { id: number; name: string; title: string; department: string; photoUrl?: string; managerId?: number; }
interface IState { people: IPerson[]; loading: boolean; }

export default class OrgChart extends React.Component<IOrgChartProps, IState> {
  constructor(props: IOrgChartProps) {
    super(props);
    this.state = { people: [], loading: true };
  }

  public componentDidMount(): void {
    const mockPeople: IPerson[] = [
      { id: 1, name: 'John Smith', title: 'Chief Executive Officer', department: 'Executive' },
      { id: 2, name: 'Sarah Johnson', title: 'Chief Financial Officer', department: 'Finance', managerId: 1 },
      { id: 3, name: 'Michael Brown', title: 'Chief Operating Officer', department: 'Operations', managerId: 1 },
      { id: 4, name: 'Emily Davis', title: 'Chief Technology Officer', department: 'Technology', managerId: 1 },
      { id: 5, name: 'David Wilson', title: 'HR Director', department: 'Human Resources', managerId: 3 },
      { id: 6, name: 'Lisa Anderson', title: 'Marketing Director', department: 'Marketing', managerId: 3 }
    ];
    this.setState({ people: mockPeople, loading: false });
  }

  private _renderPerson(person: IPerson): React.ReactElement {
    return (
      <div key={person.id} className={styles.personCard}>
        <div className={styles.personPhoto}>
          {person.photoUrl ? <img src={person.photoUrl} alt={person.name} /> : <Icon iconName="Contact" />}
        </div>
        <div className={styles.personName}>{person.name}</div>
        <div className={styles.personTitle}>{person.title}</div>
        <div className={styles.personDept}>{person.department}</div>
      </div>
    );
  }

  public render(): React.ReactElement<IOrgChartProps> {
    const { title } = this.props;
    const { people } = this.state;

    const ceo = people.find(p => !p.managerId);
    const directReports = people.filter(p => p.managerId === ceo?.id);
    const thirdLevel = people.filter(p => directReports.some(dr => dr.id === p.managerId));

    return (
      <section className={styles.orgChart}>
        <div className={styles.container}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <div className={styles.chartContainer}>
            {ceo && <div className={styles.level}>{this._renderPerson(ceo)}</div>}
            {directReports.length > 0 && <div className={styles.level}>{directReports.map(p => this._renderPerson(p))}</div>}
            {thirdLevel.length > 0 && <div className={styles.level}>{thirdLevel.map(p => this._renderPerson(p))}</div>}
          </div>
        </div>
      </section>
    );
  }
}
