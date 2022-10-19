import styles from './styles.module.css';

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbar}></nav>
      </header>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
