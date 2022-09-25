import { ListItem } from '../../common/Dropdown';
import styles from './styles.module.css';

const ListActionsListItem = ({ children }: WithChildrenProps): JSX.Element => {
  return <ListItem className={styles.ListActionsListItem}>{children}</ListItem>;
};

export default ListActionsListItem;
