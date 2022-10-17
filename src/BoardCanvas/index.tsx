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
    (sourceIdx, destinationIdx) => {
      const { lists } = board;
      const movedList = lists[sourceIdx];
      const newRank = calcItemNewRank(
        lists[destinationIdx - 1],
        lists[destinationIdx]
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
      sourceIdx: number,
      destinationIdx: number,
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

      const movedCard = oldParent.cards[sourceIdx];
      const newRank = calcItemNewRank(
        newParent.cards[destinationIdx - 1],
        newParent.cards[destinationIdx]
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
    ({ sourceIdx, destinationIdx, oldParentId, newParentId }) => {
      if (destinationIdx === -1) return;

      if (newParentId === oldParentId && destinationIdx === sourceIdx) {
        return;
      }

      if (oldParentId === BOARD_CANVAS_ID) {
        reorderLists(sourceIdx, destinationIdx);
      } else {
        reorderCards(sourceIdx, destinationIdx, oldParentId, newParentId);
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
          {board.lists.map((list, idx) => (
            <BoardList key={list.id} list={list} currListIdx={idx} />
          ))}
        </Droppable>
      </DragDrop>
    </BoardCanvasContext.Provider>
  );
};

export default BoardCanvas;
