import Modal, { ButtonClose } from 'components/Modal';
import { LoaderContent } from 'components/Loader';
import { ResponseAllComments } from 'types';
import { declinationComments } from 'helpers';
import styles from './styles.module.scss';

type Props = {
  data: Pick<ResponseAllComments, 'data' | 'problem'>;
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

  const commentsName = declinationComments(data.data.length);

  return (
    <>
      <Modal.Header>
        <div className={styles['engagement-comments_end']}>
          <ButtonClose onClick={onClose} />
        </div>
        <div className={styles['engagement-comments__box']}>
          {data.problem && (
            <>
              <span
                className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_m']}`}
              >
                Топ-проблематика
              </span>
              <div className={styles['engagement-comments__text']}>
                {data.problem}
              </div>
            </>
          )}
          <span
            className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_l']}`}
          >
            {data.data.length} {commentsName}
          </span>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['engagement-comments__wrapper']}>
          {data.data.map(({ text, person_name, position_name }, index) => {
            return (
              <div className={styles['engagement-comments__card']} key={index}>
                <div className={styles['engagement-comments__card_text']}>
                  {text}
                </div>
                <div className={styles['engagement-comments__card_name']}>
                  {person_name}
                </div>
                <div className={styles['engagement-comments__card_position']}>
                  {position_name}
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalContent;
