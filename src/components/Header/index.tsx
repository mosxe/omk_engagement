import HeaderImage from 'assets/images/header.png';
// import HeaderImageMobile from 'assets/images/header_mobile.png';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__wrapper}>
        <div className={styles.header__image}>
          <img src={HeaderImage} alt='Картинка' />
        </div>
      </div>
    </div>
  );
};

export default Header;
