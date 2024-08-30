import { Sort } from './index';
import classNames from 'classnames';
import styles from './styles.module.scss';

type ThProps = {
  title: string;
  field?: string;
  onSorting?: (index: string, sort: Sort) => void;
  isSorting?: boolean;
  className?: string;
};

const TH = ({
  title,
  field,
  isSorting = false,
  onSorting,
  className
}: ThProps) => {
  if (isSorting) {
    const classNameTh = classNames(styles.table__row, className);

    return (
      <th>
        <div className={styles.table__th}>
          <div className={styles.table__title}>{title}</div>
          <div className={classNameTh}>
            <div
              className={styles.table__wrapper}
              onClick={() =>
                onSorting !== undefined
                  ? onSorting(field ?? '', 'asc')
                  : undefined
              }
            >
              <svg
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.66667 6.66667H16.3333M9.66667 10H13.8333M9.66667 13.3333H12.1667M9.66667 3.33333H18M5.08333 17.5V2.5M5.08333 17.5C4.5 17.5 3.41 15.8383 3 15.4167M5.08333 17.5C5.66667 17.5 6.75667 15.8383 7.16667 15.4167'
                  stroke='#8D8E91'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className={styles.table__sorting}>по возрастанию</span>
            </div>
            <div
              className={styles.table__wrapper}
              onClick={() =>
                onSorting !== undefined
                  ? onSorting(field ?? '', 'desc')
                  : undefined
              }
            >
              <svg
                width='21'
                height='20'
                viewBox='0 0 21 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.66667 10H16.3333M9.66667 6.66667H13.8333M9.66667 3.33333H12.1667M9.66667 13.3333H18M5.08333 17.5V2.5M5.08333 17.5C4.5 17.5 3.41 15.8383 3 15.4167M5.08333 17.5C5.66667 17.5 6.75667 15.8383 7.16667 15.4167'
                  stroke='#8D8E91'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span className={styles.table__sorting}>по убыванию</span>
            </div>
          </div>
        </div>
      </th>
    );
  }
  return <th>{title}</th>;
};

export default TH;
