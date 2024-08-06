import classNames from 'classnames';
// import { Role, IResponseItem } from 'types';
import styles from './styles.module.scss';

// type Props = {
//   role: Role;
//   navRole: Role;
//   onClick: (role: Role) => void;
//   dataHRBP: IResponseItem;
// };

const Navs = () => {
  const classNameBtn = classNames(styles.navs__btn, {
    [styles.navs__btn_active]: 1 === 2
  });

  // const isShowHRBP =
  //   dataHRBP.dataInterview.length > 0 ||
  //   dataHRBP.dataProcess.length > 0 ||
  //   dataHRBP.dataWorking.length > 0;

  return (
    <div className={styles.navs}>
      <button
        className={classNameBtn}
        type='button'
        // onClick={() => onClick('manager')}
      >
        Вовлеченность
      </button>
      {/* {role === 'recruiter' && ( */}
      <button
        className={classNameBtn}
        type='button'
        // onClick={() => onClick('recruiter')}
      >
        Компас изменений РСС/рабочие
      </button>
      <button
        className={classNameBtn}
        type='button'
        disabled
        // onClick={() => onClick('hr_bp')}
      >
        Открытые вопросы
      </button>
    </div>
  );
};

export default Navs;
