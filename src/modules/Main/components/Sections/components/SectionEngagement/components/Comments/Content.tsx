import { Comments } from 'types';
import Card from './Card';
import NoData from 'modules/Main/components/NoData';
import styles from './styles.module.scss';

type Props = {
  data: Comments[];
  onClick: (value: string) => void;
  isError: boolean;
};

const Content = ({ data, onClick, isError }: Props) => {
  if (!data.length || isError) {
    return (
      <div className={styles['engagement-comments__row']}>
        <NoData text='Данные отсутствуют' />
      </div>
    );
  }

  return data.map((comment) => {
    return (
      <div key={comment.id}>
        <div className={styles['engagement-comments__description']}>
          <div className={styles['engagement-comments__text']}>
            {comment.title}
          </div>
          <span className={styles['engagement-comments__subtext']}>
            топ-проблематика
          </span>
        </div>
        {
          <div className={styles['engagement-comments__wrapper']}>
            {comment.comments.map((card, index) => (
              <Card key={index} text={card} />
            ))}
          </div>
        }
        {comment.is_all && (
          <button
            className={styles['engagement-comments__btn']}
            type='button'
            onClick={() => onClick(comment.id)}
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
      </div>
    );
  });
};

export default Content;
