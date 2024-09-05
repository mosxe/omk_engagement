import Modal, { ButtonClose } from 'components/Modal';
import { LoaderContent } from 'components/Loader';
import { CommentItem } from 'types';
import { declinationComments } from 'helpers';
import styles from './styles.module.scss';

type Props = {
  data: { id: string; title: string; comments: CommentItem[] } | undefined;
  isLoading: boolean;
  onClose: () => void;
};

const ModalContent = ({ data, isLoading, onClose }: Props) => {
  if (isLoading) {
    return (
      <>
        <Modal.Header>
          <div className={styles['engagement-comments_end']}>
            <ButtonClose onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['engagement-comments__container']}>
            <LoaderContent />
          </div>
        </Modal.Body>
      </>
    );
  }

  if (data === undefined) {
    return (
      <>
        <Modal.Header>
          <div className={styles['engagement-comments_end']}>
            <ButtonClose onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['engagement-comments__empty']}>
            Данные отсутствуют
          </div>
        </Modal.Body>
      </>
    );
  }

  return (
    <>
      <Modal.Header>
        <div className={styles['engagement-comments_end']}>
          <ButtonClose onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['engagement-comments__modal']}>
          <div className={styles['engagement-comments__box']}>
            <span
              className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_m']}`}
            >
              Топ-проблематика
            </span>
            <div className={styles['engagement-comments__text']}>
              {data.title}
            </div>
            <span
              className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_l']}`}
            >
              {data.comments.length} {declinationComments(data.comments.length)}
            </span>
          </div>
          <div className={styles['engagement-comments__wrapper']}>
            {data.comments.map(
              ({ text, person_name, position_name }, index) => {
                return (
                  <div
                    className={styles['engagement-comments__card']}
                    key={index}
                  >
                    <div className={styles['engagement-comments__card_text']}>
                      {text}
                    </div>
                    <div className={styles['engagement-comments__card_name']}>
                      {person_name}
                    </div>
                    <div
                      className={styles['engagement-comments__card_position']}
                    >
                      {position_name}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalContent;
