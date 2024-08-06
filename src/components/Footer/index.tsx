import logoImage from 'assets/images/logo_footer.png';
import portalImage from 'assets/images/portal_footer.png';
import styles from './styles.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const sing = `ОМК.${currentYear}. Все права защищены`;

  return (
    <div className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__container}>
          <div className={styles.footer__contacts}>
            <span className={styles.footer__text}>
              Написать письмо<br></br> в Корпоративный университет
            </span>
            <a
              className={styles.footer__email}
              type='email'
              href='mailto:university@omk.ru'
            >
              university@omk.ru
            </a>
          </div>
          <div className={styles.footer__logo}>
            <img
              width='88'
              height='94'
              src={logoImage}
              alt='Логотип компании'
            />
            <div className={styles.footer__copirate}>
              <span className={styles['footer__copirate--sign']}>©</span>
              <span className={styles['footer__copirate--text']}>{sing}</span>
            </div>
          </div>
          <div className={styles.footer__portal}>
            <div
              className={`${styles.footer__text} ${styles['footer__text--gray']}`}
            >
              Портал обучения
            </div>
            <img
              width='140'
              height='16'
              src={portalImage}
              alt='Логотип портала'
            />
          </div>
        </div>
        <div className={styles.footer__copirate}>
          <span className={styles['footer__copirate--sign']}>©</span>
          <span className={styles['footer__copirate--text']}>{sing}</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
