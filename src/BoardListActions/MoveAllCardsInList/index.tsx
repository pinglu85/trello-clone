import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { LexoRank } from 'lexorank';

import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import BoardListContext from '../../contexts/BoardListContext';
import { DropdownContext } from '../../common/Dropdown';
import { MOVE_ALL_CARDS_IN_LIST } from './mutation';
import updateCacheAfterAllCardsMoved from './updateCacheAfterAllCardsMoved';
import { MenuContent } from '../../common/Menu';
import ListActionsListItem from '../ListActionsListItem';
import styles from './styles.module.css';
import type {
  Card,
  MoveAllCardsInListMutation,
  MoveAllCardsInListMutationVariables,
} from '../../generated/graphql';

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
  const dropdownContext = useContext(DropdownContext);
  const [moveAllCardsInList] = useMutation<
    MoveAllCardsInListMutation,
    MoveAllCardsInListMutationVariables
  >(MOVE_ALL_CARDS_IN_LIST, {
    update: updateCacheAfterAllCardsMoved,
  });

  if (!boardCanvasContext || !boardListContext || !dropdownContext) {
    return null;
  }

  const { lists } = boardCanvasContext;
  const { currListId, cardsInCurrList } = boardListContext;

  const moveAllCardsToList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (cardsInCurrList.length === 0 || !(e.target instanceof Element)) {
      dropdownContext.closeDropdownMenu();
      return;
    }

    const destinationListId = e.target.id;
    const destinationList = lists.find((list) => list.id === destinationListId);
    if (!destinationList) return;

    let prevCardLexoRank: LexoRank | null = null;
    if (destinationList.cards.length > 0) {
      const { cards } = destinationList;
      const lastCard = cards[cards.length - 1];
      prevCardLexoRank = LexoRank.parse(lastCard.rank);
    }

    const newRankMap: Record<string, string> = {};
    const updatedCards: Card[] = [];
    for (const card of cardsInCurrList) {
      const currCardNewLexoRank = prevCardLexoRank
        ? prevCardLexoRank.genNext()
        : LexoRank.middle();
      const currCardNewRank = currCardNewLexoRank.toString();
      newRankMap[card.id] = currCardNewRank;
      prevCardLexoRank = currCardNewLexoRank;

      updatedCards.push({
        ...card,
        boardId: destinationList.boardId,
        listId: destinationList.id,
        rank: currCardNewRank,
      });
    }

    moveAllCardsInList({
      variables: {
        oldListId: currListId,
        newBoardId: destinationList.boardId,
        newListId: destinationListId,
        newRankMap,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        moveAllCardsInList: {
          oldListId: currListId,
          cards: updatedCards,
        },
      },
    });

    dropdownContext.closeDropdownMenu();
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
