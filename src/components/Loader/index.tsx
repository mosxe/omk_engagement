import classNames from 'classnames';
import styles from './styles.module.scss';

type Props = {
  position?: 'relative' | 'fixed' | 'absolute';
};

const LoaderContent = ({ position = 'relative' }: Props) => {
  const classNameLoader = classNames(styles.loader__wrapper, {
    [styles.loader__wrapper_fixed]: position === 'fixed',
    [styles.loader__wrapper_absolute]: position === 'absolute'
  });

  return (
    <div className={classNameLoader}>
      <div className={styles['loader-content']}></div>
    </div>
  );
};

const Loader = () => <div className={styles.loader}></div>;

export { LoaderContent };
export default Loader;
