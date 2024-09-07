import styles from './styles.module.scss';

type Props = {
  isSorting?: boolean;
};
const COUNT = 5;

const TH = ({ isSorting = false }: { isSorting?: boolean }) => {
  if (isSorting) {
    return (
      <th>
        <div className={styles.table__th}>
          <div
            className={`${styles.table__skeleton_line} ${styles.table__skeleton}`}
          ></div>
          <div className={styles.table__row}>
            <div
              className={`${styles.table__skeleton_rectangle} ${styles.table__skeleton}`}
            ></div>
            <div
              className={`${styles.table__skeleton_rectangle} ${styles.table__skeleton}`}
            ></div>
          </div>
        </div>
      </th>
    );
  }
  return (
    <th>
      <div
        className={`${styles.table__skeleton_line} ${styles.table__skeleton}`}
      ></div>
    </th>
  );
};

const Skeleton = ({ isSorting = false }: Props) => {
  return (
    <table className={`${styles.table} `}>
      <thead>
        <tr>
          <TH />
          <TH isSorting={isSorting} />
          <TH isSorting={isSorting} />
        </tr>
      </thead>
      <tbody>
        {[...Array(COUNT)].map((_, index) => {
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
};

export default Skeleton;
