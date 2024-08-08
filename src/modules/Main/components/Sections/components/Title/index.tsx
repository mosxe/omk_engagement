import Tooltip from 'components/Tooltip';
import styles from './styles.module.scss';

type Props = {
  title: string;
  image: string;
  tooltipText: string;
};

const Title = ({ title, image, tooltipText }: Props) => {
  return (
    <div className={styles['section-title']}>
      <img src={image} width={50} height={50} alt='Картинка' />
      <div className={styles['section-title__container']}>
        <div className={styles['section-title__text']}>{title}</div>
        <div className={styles['section-title__tooltip']}>
          <Tooltip id='tooltip_help' text={tooltipText} />
        </div>
      </div>
    </div>
  );
};

export default Title;
