import styles from './styles.module.scss';

type Props = {
  text?: string;
};

const NoData = ({ text = 'Данные отсутствуют' }: Props) => {
  return <div className={styles['no-data']}>{text}</div>;
};

export default NoData;
