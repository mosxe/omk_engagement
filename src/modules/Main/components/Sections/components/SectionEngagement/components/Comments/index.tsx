import { useState } from 'react';
import Image from 'assets/images/Engagement/img_4.png';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import ModalContent from './ModalContent';
import Content from './Content';
import { Comments as IComments } from 'types';
import { useLazyGetAllCommentsQuery } from 'store/apiSlice';
import { initialAllComments } from 'store/constants';
import { transformDataFilters } from 'helpers';
import { useAppSelector } from 'store/hooks';
import styles from './styles.module.scss';

type Props = {
  data: IComments | undefined;
  type: 'zone' | 'issue';
  isLoading: boolean;
};

const Comments = ({ data, type, isLoading }: Props) => {
  const [
    getAllComments,
    {
      data: dataAllComments = initialAllComments,
      isFetching: isFetchingAllComments
    }
  ] = useLazyGetAllCommentsQuery();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setIsShowModal((prevValue) => {
      if (!prevValue) {
        const dataFilters = transformDataFilters(selectedFilters);
        getAllComments({ filters: dataFilters, type: type })
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
        {data !== undefined && data.problem && !isLoading && (
          <div className={styles['engagement-comments__description']}>
            <div className={styles['engagement-comments__text']}>
              {data.problem}
            </div>
            <span className={styles['engagement-comments__subtext']}>
              топ-проблематика
            </span>
          </div>
        )}
        <Content data={data?.data} isLoading={isLoading} />
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
          data={dataAllComments}
          onClose={handleModal}
          isLoading={isFetchingAllComments}
        />
      </Modal>
    </>
  );
};

export default Comments;
