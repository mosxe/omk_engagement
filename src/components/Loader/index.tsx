import styles from './styles.module.scss';

type Props = {
  position?: 'relative' | 'fixed';
};

const LoaderContent = ({ position = 'relative' }: Props) => {
  const className =
    position === 'fixed'
      ? `${styles.loader__wrapper} ${styles.loader__wrapper_fixed}`
      : styles.loader__wrapper;
  return (
    <div className={className}>
      <div className={styles['loader-content']}></div>
    </div>
  );
};

const Loader = () => <div className={styles.loader}></div>;

export { LoaderContent };
export default Loader;
