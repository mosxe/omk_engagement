import { useState } from 'react';
import Image from 'assets/svg/faq.svg';
import Modal from 'components/Modal';
import ModalContent from './ModalContent';
import { toast } from 'react-toastify';
import { Question } from 'types';
import { useLazyGetAllQuestionsCommentsQuery } from 'store/apiSlice';
import { transformDataFilters } from 'helpers';
import { useAppSelector } from 'store/hooks';
import styles from './styles.module.scss';

const QuestionCard = ({ id, name }: Question) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.questions
  );
  const [getAllQuestionsComments, { data, isLoading, isError }] =
    useLazyGetAllQuestionsCommentsQuery();

  const handleModal = (value: boolean) => {
    setIsShowModal(value);
    if (value && data === undefined) {
      const dataFilters = transformDataFilters(
        selectedFilters,
        undefined,
        'problems'
      );
      setIsShowModal(true);
      getAllQuestionsComments({ filters: dataFilters, id: id })
        .then((payload) => {
          if (
            payload.data === undefined ||
            payload.isError ||
            payload.data?.isError
          ) {
            toast('Произошла ошибка');
          }
        })
        .catch(() => toast('Произошла ошибка'));
    }
  };

  const isErrorComments = isError || (data !== undefined && data.isError);

  return (
    <>
      <div className={styles['question-card']}>
        <div className={styles['question-card__wrapper']}>
          <img src={Image} alt='Картинка' />

          <span className={styles['question-card__text']}>{name}</span>
        </div>
        <button
          className={styles['question-card__btn']}
          onClick={() => handleModal(true)}
          type='button'
        >
          Читать ответы
          <svg
            width='31'
            height='6'
            viewBox='0 0 31 6'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.5 5.5H30.5L21.0932 0.5'
              stroke='#E41910'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>
      </div>
      <Modal
        isShow={isShowModal}
        onClose={() => handleModal(false)}
        width={1400}
      >
        <ModalContent
          data={data?.data}
          onClose={() => handleModal(false)}
          isLoading={isLoading}
          isError={isErrorComments}
        />
      </Modal>
    </>
  );
};

export default QuestionCard;
