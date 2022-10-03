import joinClassNames from '../../../utils/joinClassNames';
import styles from './styles.module.css';

interface MenuHeaderProps extends WithChildrenProps {
  className?: string;
}

const MenuHeader = ({
  className = '',
  children,
}: MenuHeaderProps): JSX.Element => {
  return (
    <div className={joinClassNames(styles.MenuHeader, className)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default MenuHeader;
