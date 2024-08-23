import { ReactNode } from 'react';
import styles from '../styles.module.scss';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const ModalHeader = ({ children, ...props }: Props) => {
  return (
    <div className={styles.modal__header} {...props}>
      {children}
    </div>
  );
};

export default ModalHeader;
