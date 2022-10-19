import joinClassNames from '../../utils/joinClassNames';
import { ListItem } from '../../common/Dropdown';
import styles from './styles.module.css';

interface ListActionsListItemProps extends PropsWithChildren {
  disabled?: boolean;
}

const ListActionsListItem = ({
  disabled = false,
  children,
}: ListActionsListItemProps): JSX.Element => {
  return (
    <ListItem
      className={joinClassNames(
        styles.ListActionsListItem,
        disabled ? styles.disabled : ''
      )}
    >
      {children}
    </ListItem>
  );
};

export default ListActionsListItem;
