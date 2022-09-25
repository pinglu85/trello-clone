import joinClassNames from '../../../../utils/joinClassNames';
import styles from './styles.module.css';

interface ListItemProps extends WithChildrenProps {
  className?: string;
}

const ListItem = ({ className = '', children }: ListItemProps): JSX.Element => {
  return (
    <li className={joinClassNames(styles.ListItem, className)}>{children}</li>
  );
};

export default ListItem;
