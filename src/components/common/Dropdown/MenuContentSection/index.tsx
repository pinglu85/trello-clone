import styles from './styles.module.css';

const MenuContentSection = ({ children }: WithChildrenProps): JSX.Element => {
  return <div className={styles.MenuContentSection}>{children}</div>;
};

export default MenuContentSection;
