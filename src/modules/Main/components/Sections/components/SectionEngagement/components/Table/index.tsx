import { KeyResult } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[];
};

const Table = ({ data }: Props) => {
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
