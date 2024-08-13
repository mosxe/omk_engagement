import { InputHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox = ({ label, checked = false, onChange }: Props) => {
  const className = checked
    ? `${styles.checkbox} ${styles.checkbox_checked}`
    : styles.checkbox;
  return (
    <div className={className}>
      <label className={styles.checkbox__label}>
        <input type='checkbox' checked={checked} onChange={onChange} />
        <span className={styles['checkbox__value']}></span>
        <div className={styles['checkbox__text']}>
          <span>{label}</span>
        </div>
      </label>
    </div>
  );
};

export default CheckBox;
