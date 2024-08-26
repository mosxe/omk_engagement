import { KeyResult } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[];
  isLoading: boolean;
};

const COUNT_SKELETON = 3;

const Table = ({ data, isLoading }: Props) => {
  if (isLoading) {
    return (
      <table className={`${styles.table} `}>
        <thead>
          <tr>
            <th>Проблематика</th>
            <th>% влияния на вовлеченность</th>
            <th>Частота выбора</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(COUNT_SKELETON)].map((skeleton, index) => {
            return (
              <tr key={index}>
                <td>
                  <div
                    className={`${styles.table__skeleton_line} ${styles.table__skeleton}`}
                  ></div>
                </td>
                <td>
                  <div
                    className={`${styles.table__skeleton_line} ${styles.table__skeleton}`}
                  ></div>
                </td>
                <td>
                  <div
                    className={`${styles.table__skeleton_line} ${styles.table__skeleton}`}
                  ></div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Проблематика</th>
          <th>% влияния на вовлеченность</th>
          <th>Частота выбора</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.procent}</td>
              <td>{item.frequency}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
