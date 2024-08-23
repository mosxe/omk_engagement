import { ReactNode } from 'react';
import styles from '../styles.module.scss';

type Props = {
  children: ReactNode;
};

const ModalBody = ({ children }: Props) => {
  return <div className={styles.modal__body}>{children}</div>;
};

export default ModalBody;
