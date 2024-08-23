import { useState } from 'react';
import Modal, { ButtonClose } from 'components/Modal';
import Image from 'assets/images/Engagement/img_4.png';
import styles from './styles.module.scss';

const Comments = () => {
  const [isShowModal, setShowModal] = useState<boolean>(false);

  const handleModal = () => {
    setShowModal(!isShowModal);
  };

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
        <div className={styles['engagement-comments__wrapper']}>
          <div className={styles['engagement-comments__card']}>
            <div className={styles['engagement-comments__card_text']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{' '}
            </div>
            <div className={styles['engagement-comments__card_name']}>
              Иванов П.Е.
            </div>
            <div className={styles['engagement-comments__card_position']}>
              должность
            </div>
          </div>
          <div className={styles['engagement-comments__card']}>
            <div className={styles['engagement-comments__card_text']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{' '}
            </div>
            <div className={styles['engagement-comments__card_name']}>
              Иванов П.Е.
            </div>
            <div className={styles['engagement-comments__card_position']}>
              должность
            </div>
          </div>
          <div className={styles['engagement-comments__card']}>
            <div className={styles['engagement-comments__card_text']}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.{' '}
            </div>
            <div className={styles['engagement-comments__card_name']}>
              Иванов П.Е.
            </div>
            <div className={styles['engagement-comments__card_position']}>
              должность
            </div>
          </div>
        </div>
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
      </section>

      <Modal isShow={isShowModal} onClose={handleModal} width={1400}>
        <Modal.Header>
          <div className={styles['engagement-comments_end']}>
            <ButtonClose onClick={handleModal} />
          </div>
          <div className={styles['engagement-comments__box']}>
            <span
              className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_m']}`}
            >
              Топ-проблематика
            </span>
            <div className={styles['engagement-comments__text']}>
              Руководитель{' '}
              <span className={styles['engagement-comments__text_red']}>
                отделяет себя от своих сотрудников,
              </span>{' '}
              не встает на их сторону
            </div>
            <span
              className={`${styles['engagement-comments__subtext']} ${styles['engagement-comments__subtext_l']}`}
            >
              210 комментариев
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className={styles['engagement-comments__wrapper']}>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
            <div className={styles['engagement-comments__card']}>
              <div className={styles['engagement-comments__card_text']}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.{' '}
              </div>
              <div className={styles['engagement-comments__card_name']}>
                Иванов П.Е.
              </div>
              <div className={styles['engagement-comments__card_position']}>
                должность
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Comments;
