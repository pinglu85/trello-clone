import Dropdown, {
  DropdownMenuToggle,
  MultiLevelDropdownMenu,
  MultiLevelDropdownMenuHeader,
} from '../common/Dropdown';
import { ReactComponent as MoreIcon } from './more-horizontal.svg';
import MainMenuContent from './MainMenuContent';
import styles from './styles.module.css';

const BoardListActions = (): JSX.Element => {
  return (
    <Dropdown>
      <DropdownMenuToggle className={styles.moreButton}>
        <MoreIcon />
      </DropdownMenuToggle>

      <MultiLevelDropdownMenu
        mainMenuTitle="List Actions"
        menuHeader={<MultiLevelDropdownMenuHeader />}
        mainMenuContent={<MainMenuContent />}
      />
    </Dropdown>
  );
};

export default BoardListActions;
