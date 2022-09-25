import { MenuContent, MenuDivider } from '../../common/Menu';
import { MenuContentSection } from '../../common/Dropdown';
import ListActionsListItem from '../ListActionsListItem';
import MoveList from '../MoveList';

interface MainMenuContentProps {
  currListIdx: number;
}

const MainMenuContent = ({
  currListIdx,
}: MainMenuContentProps): JSX.Element => {
  return (
    <MenuContent>
      <MenuContentSection>
        <ul>
          <ListActionsListItem>Add card...</ListActionsListItem>

          <ListActionsListItem>Copy list...</ListActionsListItem>

          <ListActionsListItem>
            <MoveList currListIdx={currListIdx} />
          </ListActionsListItem>
        </ul>
      </MenuContentSection>

      <MenuDivider />

      <MenuContentSection>
        <ul>
          <ListActionsListItem>Sort by...</ListActionsListItem>
        </ul>
      </MenuContentSection>

      <MenuDivider />

      <MenuContentSection>
        <ul>
          <ListActionsListItem>
            Move all cards in this list…
          </ListActionsListItem>
          <ListActionsListItem>
            Archive all cards in this list…
          </ListActionsListItem>
        </ul>
      </MenuContentSection>

      <MenuDivider />

      <MenuContentSection>
        <ul>
          <ListActionsListItem>Archive this list</ListActionsListItem>
        </ul>
      </MenuContentSection>
    </MenuContent>
  );
};

export default MainMenuContent;
