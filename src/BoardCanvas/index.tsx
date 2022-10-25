import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { MOVE_CARD, MOVE_LIST } from './mutation';
import updateCacheAfterListMoved from './utils/updateCacheAfterListMoved';
import updateCacheAfterCardMoved from './utils/updateCacheAfterCardMoved';
import calcItemNewRank from '../utils/calcItemRank';
import BoardCanvasContext from '../contexts/BoardCanvasContext';
import DragDrop, { Droppable, DragDropTypes } from '../DragDrop';
import BoardList from '../BoardList';
import styles from './styles.module.css';
import type { OnDragEnd } from '../DragDrop';
import type {
  Board,
  MoveCardMutation,
  MoveCardMutationVariables,
  MoveListMutation,
  MoveListMutationVariables,
} from '../generated/graphql';

interface BoardCanvasProps {
  board: Board;
}

const BOARD_CANVAS_ID = 'boardCanvas';

const BoardCanvas = ({ board }: BoardCanvasProps): JSX.Element => {
  const [moveList] = useMutation<MoveListMutation, MoveListMutationVariables>(
    MOVE_LIST,
    {
      update: updateCacheAfterListMoved,
    }
  );
  const [moveCard] = useMutation<MoveCardMutation, MoveCardMutationVariables>(
    MOVE_CARD,
    {
      update: updateCacheAfterCardMoved,
    }
  );

  const reorderLists: ReorderLists = useCallback(
    (sourceIndex, destinationIndex) => {
      const { lists } = board;
      const movedList = lists[sourceIndex];
      const newRank = calcItemNewRank(
        lists[destinationIndex - 1],
        lists[destinationIndex]
      );

      moveList({
        variables: {
          moveListId: movedList.id,
          newBoardId: board.id,
          newRank: newRank,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          moveList: {
            id: movedList.id,
            boardId: board.id,
            oldBoardId: board.id,
            rank: newRank,
          },
        },
      });
    },
    [board, moveList]
  );

  const reorderCards = useCallback(
    (
      sourceIndex: number,
      destinationIndex: number,
      oldParentId: string,
      newParentId: string
    ) => {
      const { lists } = board;
      const oldParent = lists.find(({ id }) => id === oldParentId);
      if (!oldParent) return;

      const newParent =
        newParentId === oldParentId
          ? oldParent
          : lists.find(({ id }) => id === newParentId);
      if (!newParent) return;

      const movedCard = oldParent.cards[sourceIndex];
      const newRank = calcItemNewRank(
        newParent.cards[destinationIndex - 1],
        newParent.cards[destinationIndex]
      );

      moveCard({
        variables: {
          moveCardId: movedCard.id,
          newBoardId: board.id,
          newListId: newParent.id,
          newRank: newRank,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          moveCard: {
            oldListId: oldParent.id,
            card: {
              ...movedCard,
              boardId: board.id,
              listId: newParent.id,
              rank: newRank,
            },
          },
        },
      });
    },
    [board, moveCard]
  );

  const onDragEnd: OnDragEnd = useCallback(
    ({ sourceIndex, destinationIndex, oldParentId, newParentId }) => {
      if (destinationIndex === -1) return;

      if (newParentId === oldParentId && destinationIndex === sourceIndex) {
        return;
      }

      if (oldParentId === BOARD_CANVAS_ID) {
        reorderLists(sourceIndex, destinationIndex);
      } else {
        reorderCards(sourceIndex, destinationIndex, oldParentId, newParentId);
      }
    },
    [reorderLists, reorderCards]
  );

  return (
    <BoardCanvasContext.Provider value={{ lists: board.lists, reorderLists }}>
      <DragDrop onDragEnd={onDragEnd}>
        <Droppable
          className={styles.BoardCanvas}
          droppableId={BOARD_CANVAS_ID}
          type={DragDropTypes.List}
        >
          {board.lists.map((list, index) => (
            <BoardList key={list.id} list={list} currListIndex={index} />
          ))}
        </Droppable>
      </DragDrop>
    </BoardCanvasContext.Provider>
  );
};

export default BoardCanvas;
