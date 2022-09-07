import type { PropsWithChildren } from 'react';

import styles from './styles.module.css';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
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
