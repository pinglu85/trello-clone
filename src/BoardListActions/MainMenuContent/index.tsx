import { MenuContent, MenuDivider } from '../../common/Menu';
import { MenuContentSection } from '../../common/Dropdown';
import ListActionsListItem from '../ListActionsListItem';
import CopyList from '../CopyList';
import MoveList from '../MoveList';
import MoveAllCardsInList from '../MoveAllCardsInList';

const MainMenuContent = (): JSX.Element => {
  return (
    <MenuContent>
      <MenuContentSection>
        <ul>
          <ListActionsListItem>Add card...</ListActionsListItem>

          <ListActionsListItem>
            <CopyList />
          </ListActionsListItem>

          <ListActionsListItem>
            <MoveList />
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
            <MoveAllCardsInList />
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
