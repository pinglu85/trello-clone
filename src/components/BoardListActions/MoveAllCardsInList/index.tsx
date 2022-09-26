import { useContext } from 'react';

import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import BoardCanvasContext from '../../../contexts/BoardCanvasContext';
import BoardListContext from '../../../contexts/BoardListContext';
import { DropdownContext } from '../../common/Dropdown';
import { MenuContent } from '../../common/Menu';
import ListActionsListItem from '../ListActionsListItem';
import styles from './styles.module.css';

const MoveAllCardsInList = (): JSX.Element | null => {
  return (
    <SubmenuTrigger
      submenuTitle="Move all cards in list"
      submenuContent={<MoveAllCardsInListMenu />}
    >
      Move all cards in this list…
    </SubmenuTrigger>
  );
};

const MoveAllCardsInListMenu = (): JSX.Element | null => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const boardListContext = useContext(BoardListContext);
  const dropdownMenuContext = useContext(DropdownContext);
  if (!boardCanvasContext || !boardListContext || !dropdownMenuContext) {
    return null;
  }

  const { lists, groupedCards, setGroupedCards } = boardCanvasContext;
  const { currListId } = boardListContext;

  const moveAllCardsToList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (e.target instanceof Element) {
      const cardsInCurrList = groupedCards[currListId];
      const destinationListId = e.target.id;
      const cardsInDestinationList = groupedCards[destinationListId];

      setGroupedCards({
        ...groupedCards,
        [currListId]: [],
        [destinationListId]: [...cardsInDestinationList, ...cardsInCurrList],
      });

      dropdownMenuContext.closeDropdownMenu();
    }
  };

  return (
    <MenuContent>
      <ul>
        {lists.map(({ id, name }) => (
          <ListActionsListItem key={id} disabled={id === currListId}>
            <button
              id={id}
              className={styles.moveAllCardsButton}
              onClick={moveAllCardsToList}
              disabled={id === currListId}
            >
              {`${name}${id === currListId ? ' (current)' : ''}`}
            </button>
          </ListActionsListItem>
        ))}
      </ul>
    </MenuContent>
  );
};

export default MoveAllCardsInList;
