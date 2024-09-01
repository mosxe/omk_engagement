import styles from './styles.module.scss';

type Props = {
  isSorting?: boolean;
};
const COUNT = 6;

const TH = ({
  isSorting = false,
  title
}: {
  isSorting?: boolean;
  title: string;
}) => {
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
          <TH title='Проблематика' isSorting={isSorting} />
          <TH title='% влияния на вовлеченность' isSorting={isSorting} />
          <TH title='Частота выбора' isSorting={isSorting} />
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
