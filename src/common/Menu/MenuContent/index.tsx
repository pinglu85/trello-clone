import joinClassNames from '../../../utils/joinClassNames';
import styles from './styles.module.css';

const MenuContent = ({ children }: WithChildrenProps): JSX.Element => {
  return (
    <div className={joinClassNames(styles.MenuContent, 'verticalScrollbar')}>
      <div className={styles.MenuContentInnerContainer}>{children}</div>
    </div>
  );
};

export default MenuContent;
