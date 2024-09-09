import Modal, { ButtonClose } from 'components/Modal';
import NoData from 'modules/Main/components/NoData';
import { LoaderContent } from 'components/Loader';
import { declinationAnswers } from 'helpers';
import styles from './styles.module.scss';

type Props = {
  data: { title: string; comments: string[] } | undefined;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
};

const ModalContent = ({ data, isLoading, isError, onClose }: Props) => {
  if (isLoading) {
    return (
      <>
        <Modal.Header>
          <div className={styles['question-card_end']}>
            <ButtonClose onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['question-card__modal_container']}>
            <LoaderContent />
          </div>
        </Modal.Body>
      </>
    );
  }

  if (data === undefined || isError) {
    return (
      <>
        <Modal.Header>
          <div className={styles['question-card_end']}>
            <ButtonClose onClick={onClose} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <NoData />
        </Modal.Body>
      </>
    );
  }

  return (
    <>
      <Modal.Header>
        <div className={styles['question-card_end']}>
          <ButtonClose onClick={onClose} />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className={styles['question-card__modal']}>
          <div className={styles['question-card__modal_box']}>
            <span className={styles['question-card__modal_text']}>
              {data.title}
            </span>
            <span className={styles['question-card__modal_subtext']}>
              {data.comments.length} {declinationAnswers(data.comments.length)}
            </span>
          </div>
          <div className={styles['question-card__modal_wrapper']}>
            {data.comments.map((card, index) => {
              return (
                <div
                  className={styles['question-card__modal_card']}
                  key={index}
                >
                  <div className={styles['question-card__modal_card-text']}>
                    {card}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default ModalContent;
