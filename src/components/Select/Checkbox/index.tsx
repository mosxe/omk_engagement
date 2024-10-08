﻿import styles from '../styles.module.scss';

type Props = {
  checked: boolean;
  label: string;
};

const Checkbox = ({ label, checked }: Props) => {
  return (
    <div className={styles['checkbox']}>
      <input type='checkbox' checked={checked} onChange={() => {}} />
      <span className={styles['checkbox__value']}>
        <svg
          width='12'
          height='10'
          viewBox='0 0 12 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M3.99993 7.80007L1.19993 5.00006L0.266602 5.9334L3.99993 9.66673L11.9999 1.66673L11.0666 0.733398L3.99993 7.80007Z'
            fill='white'
          />
        </svg>
      </span>
      <div className={styles['checkbox__text']}>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Checkbox;
