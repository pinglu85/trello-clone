import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import BoardListContext from '../../contexts/BoardListContext';
import { DropdownContext } from '../../common/Dropdown';
import MOVE_ALL_CARDS from './mutation';
import updateCacheAfterCardsMoved from './updateCacheAfterCardsMoved';
import { MenuContent } from '../../common/Menu';
import ListActionsListItem from '../ListActionsListItem';
import styles from './styles.module.css';
import type {
  MoveAllCardsMutation,
  MoveAllCardsMutationVariables,
} from '../../generated/graphql';

const MoveAllCards = (): JSX.Element | null => {
  return (
    <SubmenuTrigger
      submenuTitle="Move all cards in list"
      submenuContent={<MoveAllCardsMenu />}
    >
      Move all cards in this list…
    </SubmenuTrigger>
  );
};

const MoveAllCardsMenu = (): JSX.Element | null => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const boardListContext = useContext(BoardListContext);
  const dropdownContext = useContext(DropdownContext);
  const [moveAllCards] = useMutation<
    MoveAllCardsMutation,
    MoveAllCardsMutationVariables
  >(MOVE_ALL_CARDS, {
    update: updateCacheAfterCardsMoved,
  });

  if (!boardCanvasContext || !boardListContext || !dropdownContext) {
    return null;
  }

  const { currBoard } = boardCanvasContext;
  const { currList } = boardListContext;

  const moveAllCardsToList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (currList.cards.length === 0 || !(e.target instanceof Element)) {
      dropdownContext.closeDropdownMenu();
      return;
    }

    moveAllCards({
      variables: {
        sourceListId: currList.id,
        destinationBoardId: currList.boardId,
        destinationListId: e.target.id,
      },
    });

    dropdownContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <ul>
        {currBoard.lists.map(({ id, name }) => (
          <ListActionsListItem key={id} disabled={id === currList.id}>
            <button
              id={id}
              className={styles.moveAllCardsButton}
              onClick={moveAllCardsToList}
              disabled={id === currList.id}
            >
              {`${name}${id === currList.id ? ' (current)' : ''}`}
            </button>
          </ListActionsListItem>
        ))}
      </ul>
    </MenuContent>
  );
};

export default MoveAllCards;
