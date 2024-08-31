import { useState, useEffect } from 'react';
import TH from './Th';
import { KeyResult } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[];
  isLoading: boolean;
  isSorting?: boolean;
  countSkeletonLoading?: number;
};

export type Sort = 'asc' | 'desc';

const Table = ({
  data,
  isLoading,
  isSorting = false,
  countSkeletonLoading = 3
}: Props) => {
  const [tableData, setTableData] = useState<KeyResult[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [order, setOrder] = useState<Sort>('asc');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const handleSortingChange = (field: string, sortOrder: Sort) => {
    if (field !== sortField || sortOrder !== order) {
      setSortField(field);
      setOrder(sortOrder);
      handleSorting(field, sortOrder);
    }
  };

  const handleSorting = (field: string, sortOrder: Sort) => {
    const sorted = [...tableData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });
    setTableData(sorted);
  };

  const getClassName = (field: string) => {
    if (field === sortField) {
      return order === 'asc'
        ? styles['table__sort-asc']
        : styles['table__sort-desc'];
    }
    return '';
  };

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
          {[...Array(countSkeletonLoading)].map((_, index) => {
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
          <TH title='Проблематика' />
          <TH
            title='% влияния на вовлеченность'
            isSorting={isSorting}
            onSorting={handleSortingChange}
            field='procent'
            className={getClassName('procent')}
          />
          <TH
            title='Частота выбора'
            isSorting={isSorting}
            onSorting={handleSortingChange}
            field='frequency'
            className={getClassName('frequency')}
          />
        </tr>
      </thead>
      <tbody>
        {tableData.map((item: any, index: number) => {
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
