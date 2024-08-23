import { useRef, useEffect, useState, ReactNode, useCallback } from 'react';
import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import { createPortal } from 'react-dom';
import styles from './styles.module.scss';

type Props = {
  isShow: boolean;
  onClose: (isShow: boolean) => void;
  children: ReactNode;
  width?: number;
};

const ButtonClose = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className={styles['modal-header-close']}
      type='button'
      onClick={onClick}
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M12 12L7 7M12 12L17 17M12 12L17 7M12 12L7 17'
          stroke='#878A8E'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  );
};

const Modal = ({ isShow, onClose, children, width }: Props) => {
  const [render, setRender] = useState(isShow);
  const modalRef = useRef<HTMLDivElement>(null);
  const className = isShow
    ? `${styles.modal} ${styles.show}`
    : `${styles.modal} ${styles.hide}`;

  useEffect(() => {
    if (isShow) {
      setRender(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isShow]);

  const handleUserKeyPress = useCallback(
    (event: any) => {
      if (event.key === 'Escape') {
        onClose(true);
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isShow) {
      window.addEventListener('keydown', handleUserKeyPress);
    }
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress, isShow]);

  const onAnimationEnd = () => {
    if (!isShow) {
      setRender(false);
    }
  };

  return (
    render &&
    createPortal(
      <div className={className} ref={modalRef} onAnimationEnd={onAnimationEnd}>
        <div className={styles.modal__wrapper} style={{ maxWidth: width }}>
          <div className={styles.modal__content}>{children}</div>
        </div>
      </div>,
      document.body
    )
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;

export { ButtonClose };
