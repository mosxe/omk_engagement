import styles from './styles.module.scss';

const Table = () => {
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
        <tr>
          <td>Людей не достаточно, чтобы выполнять работу</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
