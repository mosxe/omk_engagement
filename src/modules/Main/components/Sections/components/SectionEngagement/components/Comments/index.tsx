import { useState } from 'react';
import Image from 'assets/images/Engagement/img_4.png';
import { toast } from 'react-toastify';
import Modal from 'components/Modal';
import ModalContent from './ModalContent';
import Content from './Content';
import Skeleton from './Skeleton';
import { Comments as IComments } from 'types';
import { useLazyGetAllCommentsQuery } from 'store/apiSlice';
import { transformDataFilters } from 'helpers';
import { useAppSelector } from 'store/hooks';
import styles from './styles.module.scss';

type Props = {
  data: IComments[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const Comments = ({ data, isLoading, isError }: Props) => {
  const [
    getAllComments,
    { isFetching: isFetchingAllComments, isError: isErrorAllComments }
  ] = useLazyGetAllCommentsQuery();
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.engagement
  );
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>('');
  const [commentsData, setCommentsData] = useState<
    { id: string; title: string; comments: string[] }[]
  >([]);

  const handleModal = (id: string) => {
    if (id === '') {
      setIsShowModal(false);
    } else {
      const findComments = commentsData.find((comment) => comment.id === id);
      if (findComments == undefined) {
        const dataFilters = transformDataFilters(selectedFilters);
        setIsShowModal(true);
        setCommentId(id);
        getAllComments({ filters: dataFilters, id })
          .then((payload) => {
            if (
              payload.data === undefined ||
              payload.isError ||
              payload.data?.isError
            ) {
              toast('Произошла ошибка');
            } else {
              const tempCommentsData = {
                id: id,
                title: payload.data.data.title,
                comments: payload.data.data.comments
              };
              setCommentsData((prevData) => [...prevData, tempCommentsData]);
            }
          })
          .catch(() => toast('Произошла ошибка'));
      } else {
        setCommentId(id);
        setIsShowModal(true);
      }
    }
  };

  const modalData = commentsData.find((comment) => comment.id === commentId);

  if (data === undefined || isLoading) {
    return (
      <section className={styles['engagement-comments']}>
        <div className={styles['engagement-comments__header']}>
          <div className={styles['engagement-comments__header_wrapper']}>
            <h2>Комментарии к ТОП проблематике</h2>
          </div>
          <div className={styles['engagement-comments__header_img']}>
            <img src={Image} alt='Картинка' />
          </div>
        </div>
        <Skeleton />
      </section>
    );
  }

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
        <Content data={data} onClick={handleModal} isError={isError} />
      </section>
      <Modal isShow={isShowModal} onClose={() => handleModal('')} width={1400}>
        <ModalContent
          data={modalData}
          onClose={() => handleModal('')}
          isLoading={isFetchingAllComments}
          isError={isErrorAllComments}
        />
      </Modal>
    </>
  );
};

export default Comments;
