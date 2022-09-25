import Dropdown, {
  DropdownMenuToggle,
  MultiLevelDropdownMenu,
  MultiLevelDropdownMenuHeader,
} from '../common/Dropdown';
import MoreIcon from './more-horizontal.svg';
import MainMenuContent from './MainMenuContent';
import styles from './styles.module.css';

interface BoardListActionsProps {
  currListIdx: number;
}

const BoardListActions = ({
  currListIdx,
}: BoardListActionsProps): JSX.Element => {
  return (
    <Dropdown>
      <DropdownMenuToggle className={styles.moreButton}>
        <MoreIcon />
      </DropdownMenuToggle>

      <MultiLevelDropdownMenu
        mainMenuTitle="List Actions"
        menuHeader={<MultiLevelDropdownMenuHeader />}
        mainMenuContent={<MainMenuContent currListIdx={currListIdx} />}
      />
    </Dropdown>
  );
};

export default BoardListActions;
