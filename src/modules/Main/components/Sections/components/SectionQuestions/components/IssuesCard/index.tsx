import { useState } from 'react';
import Modal from 'components/Modal';
import ModalContent from './ModalContent';
import { toast } from 'react-toastify';
import { Question } from 'types';
import { useLazyGetAllIssuesCommentsQuery } from 'store/apiSlice';
import { transformDataFilters } from 'helpers';
import { useAppSelector } from 'store/hooks';
import styles from './styles.module.scss';

const IssuesCard = ({ id, name }: Question) => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const selectedFilters = useAppSelector(
    (state) => state.filters.selectedFilters.issues
  );
  const [getAllIssuesComments, { data, isLoading, isError }] =
    useLazyGetAllIssuesCommentsQuery();

  const handleModal = (value: boolean) => {
    setIsShowModal(value);
    if (value && data === undefined) {
      const dataFilters = transformDataFilters(selectedFilters);
      setIsShowModal(true);
      getAllIssuesComments({ filters: dataFilters, id })
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
      <div className={styles['issue-card']}>
        <div className={styles['issue-card__wrapper']}>
          <span className={styles['issue-card__text']}>{name}</span>
          <button
            className={styles['issue-card__btn']}
            onClick={() => handleModal(true)}
            type='button'
          >
            Комментарии к проблематике
          </button>
        </div>
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

export default IssuesCard;
