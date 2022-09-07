import type { PropsWithChildren } from 'react';

import styles from './styles.module.css';

const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
