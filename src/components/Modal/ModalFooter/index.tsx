import { ReactNode } from 'react';
import styles from '../styles.module.scss';

type Props = {
  children: ReactNode;
};

const ModalFooter = ({ children }: Props) => {
  return <div className={styles.modal__footer}>{children}</div>;
};

export default ModalFooter;
