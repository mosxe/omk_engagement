import styles from './styles.module.scss';

type Props = {
  text?: string;
  isRespondents?: boolean;
};

const TextRespondents = () => {
  return (
    <>
      <p>
        Количество респондентов по выбранному фильтру менее 10 человек,
        результаты не могут быть отображены, с целью сохранения анонимности
        исследования.
      </p>
      <p>
        Вам необходимо снять фильтры или выбрать подразделение верхнего уровня.
      </p>
      <br></br>

      <p>
        В случае возникновения вопросов вы можете обратиться в службу поддержки{' '}
        <a href='mailto:sd@omk.ru'>sd@omk.ru</a> или в адрес корпоративного
        университета <a href='mailto:university@omk.ru'>university@omk.ru</a>
      </p>
    </>
  );
};

const NoData = ({ text = '', isRespondents = false }: Props) => {
  if (isRespondents) {
    return (
      <div className={styles['no-data']}>
        <TextRespondents />
      </div>
    );
  }

  return (
    <div className={`${styles['no-data']} ${styles['no-data_center']}`}>
      {text}
    </div>
  );
};

export default NoData;
