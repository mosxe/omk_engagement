import { KeyResult } from 'types';

type Props = {
  data: KeyResult[];
};

const TableBody = ({ data }: Props) => {
  if (!data.length) {
    return (
      <tr>
        <td colSpan={3}>Данные отсутствуют</td>
      </tr>
    );
  }

  return data.map((item, index: number) => {
    return (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.persent}</td>
        <td>{item.periodicity}%</td>
      </tr>
    );
  });
};

export default TableBody;
