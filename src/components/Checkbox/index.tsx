import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import styles from './styles.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
}

const CheckBoxValue = ({ label }: Pick<Props, 'label'>) => {
  return (
    <>
      <span className={styles['checkbox__value']}></span>
      <div className={styles['checkbox__text']}>
        <span>{label}</span>
      </div>
    </>
  );
};

const CheckBox = ({
  label,
  checked = false,
  onChange,
  isDisabled = false
}: Props) => {
  const className = classNames(styles.checkbox, {
    [styles.checkbox_checked]: checked,
    [styles.checkbox_disabled]: isDisabled
  });

  return (
    <div className={className}>
      <label className={styles.checkbox__label}>
        <input
          type='checkbox'
          checked={checked}
          onChange={onChange}
          disabled={isDisabled}
        />
        <CheckBoxValue label={label} />
      </label>
    </div>
  );
};

export default CheckBox;
