import { useState, useEffect } from 'react';
import Body from './Body';
import TH from './Th';
import Skeleton from './Skeleton';
import { KeyResult } from 'types';
import styles from './styles.module.scss';

type Props = {
  data: KeyResult[] | undefined;
  isLoading: boolean;
  isSorting?: boolean;
};

export type Sort = 'asc' | 'desc';

const Table = ({ data, isLoading, isSorting = false }: Props) => {
  const [tableData, setTableData] = useState<KeyResult[]>([]);
  const [sortField, setSortField] = useState<string>('');
  const [order, setOrder] = useState<Sort>('asc');

  useEffect(() => {
    if (data !== undefined) {
      setTableData(data);
    }
  }, [data]);

  const handleSortingChange = (field: string, sortOrder: Sort) => {
    if (field !== sortField || sortOrder !== order) {
      setSortField(field);
      setOrder(sortOrder);
      handleSorting(field, sortOrder);
    }
  };

  const handleSorting = (field: string, sortOrder: Sort) => {
    const sorted = [...tableData].sort((a: any, b: any) => {
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

  if (isLoading || data === undefined) {
    return <Skeleton isSorting={isSorting} />;
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
            field='persent'
            className={getClassName('procent')}
          />
          <TH
            title='Частота выбора'
            isSorting={isSorting}
            onSorting={handleSortingChange}
            field='periodicity'
            className={getClassName('frequency')}
          />
        </tr>
      </thead>
      <tbody>
        <Body data={tableData} />
      </tbody>
    </table>
  );
};

export default Table;
