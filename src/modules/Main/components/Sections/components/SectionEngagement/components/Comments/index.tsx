import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import ModalContent from './ModalContent';
import Card from './Card';
import { Comment } from 'types';
import Image from 'assets/images/Engagement/img_4.png';
import { useLazyGetCommentsQuery } from 'store/apiSlice';
import styles from './styles.module.scss';

type Props = {
  type: 'zone' | 'issue';
};

const Comments = ({ type }: Props) => {
  const [getComments, { data, isLoading }] = useLazyGetCommentsQuery();
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  useEffect(() => {
    getComments({ type: type, is_starting: true });
  }, []);

  const handleModal = () => {
    setIsShowModal((prevValue) => {
      if (data === undefined && !prevValue) {
        getComments({ type: type, is_starting: false })
          .then((payload) => {
            if (payload.isError || payload.data?.isError) {
              toast('Произошла ошибка');
            }
          })
          .catch(() => toast('Произошла ошибка'));
      }
      return !prevValue;
    });
  };

  const isShowButton = data !== undefined && data.data.length > 2;

  return (
    <>
      <section className={styles['engagement-comments']}>
        <div className={styles['engagement-comments__header']}>
          <div className={styles['engagement-comments__header_wrapper']}>
            <h2>Комментарии к ТОП проблематике</h2>
          </div>
          <div className={styles['engagement-comments__header_img']}>
            <img src={Image} alt='Картинка' />
          </div>
        </div>
        <div className={styles['engagement-comments__description']}>
          <div className={styles['engagement-comments__text']}>
            Руководитель{' '}
            <span className={styles['engagement-comments__text_red']}>
              отделяет себя от своих сотрудников,
            </span>{' '}
            не встает на их сторону
          </div>
          <span className={styles['engagement-comments__subtext']}>
            топ-проблематика
          </span>
        </div>
        {isLoading && (
          <div className={styles['engagement-comments__empty']}>
            Загрузка данных
          </div>
        )}
        {!isLoading && data?.data.length === 0 && (
          <div className={styles['engagement-comments__empty']}>
            Данные отсутствуют
          </div>
        )}
        {!isLoading && data?.data.length > 0 && (
          <div className={styles['engagement-comments__wrapper']}>
            {data?.data.map((card) => (
              <Card
                key={card.id}
                text={card.text}
                person_name={card.person_name}
                position_name={card.position_name}
              />
            ))}
          </div>
        )}
        {isShowButton && (
          <button
            className={styles['engagement-comments__btn']}
            type='button'
            onClick={handleModal}
          >
            читать все комментарии
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
        )}
      </section>
      <Modal isShow={isShowModal} onClose={handleModal} width={1400}>
        <ModalContent
          data={data?.data as Comment[]}
          onClose={handleModal}
          isLoading={isLoading}
        />
      </Modal>
    </>
  );
};

export default Comments;
