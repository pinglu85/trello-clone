import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { MOVE_LIST } from '../shared/mutation';
import { MOVE_CARD } from './mutation';
import updateCacheAfterListMoved from '../utils/updateCacheAfterListMoved';
import updateCacheAfterCardMoved from './updateCacheAfterCardMoved';
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
import type { BoardWithoutLists } from '../shared/types';

interface BoardCanvasProps {
  currBoard: Board;
  boards: BoardWithoutLists[];
}

const BOARD_CANVAS_ID = 'boardCanvas';

const BoardCanvas = ({ currBoard, boards }: BoardCanvasProps): JSX.Element => {
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

  const reorderListsInCurrBoard: ReorderListsInCurrBoard = useCallback(
    (sourceIndex, destinationIndex) => {
      const { lists } = currBoard;
      const movedList = lists[sourceIndex];
      const newRank = calcItemNewRank(
        lists[destinationIndex - 1],
        lists[destinationIndex]
      );

      moveList({
        variables: {
          moveListId: movedList.id,
          sourceBoardId: currBoard.id,
          destinationBoardId: currBoard.id,
          newRank: newRank,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          moveList: {
            ...movedList,
            rank: newRank,
          },
        },
      });
    },
    [currBoard, moveList]
  );

  const reorderCards = useCallback(
    (
      sourceIndex: number,
      destinationIndex: number,
      oldParentId: string,
      newParentId: string
    ) => {
      const { lists } = currBoard;
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
          sourceListId: oldParent.id,
          destinationBoardId: currBoard.id,
          destinationListId: newParent.id,
          newRank: newRank,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          moveCard: {
            ...movedCard,
            boardId: currBoard.id,
            listId: newParent.id,
            rank: newRank,
          },
        },
      });
    },
    [currBoard, moveCard]
  );

  const onDragEnd: OnDragEnd = useCallback(
    ({ sourceIndex, destinationIndex, oldParentId, newParentId }) => {
      if (destinationIndex === -1) return;

      if (newParentId === oldParentId && destinationIndex === sourceIndex) {
        return;
      }

      if (oldParentId === BOARD_CANVAS_ID) {
        reorderListsInCurrBoard(sourceIndex, destinationIndex);
      } else {
        reorderCards(sourceIndex, destinationIndex, oldParentId, newParentId);
      }
    },
    [reorderListsInCurrBoard, reorderCards]
  );

  return (
    <BoardCanvasContext.Provider
      value={{ currBoard, boards, reorderListsInCurrBoard }}
    >
      <DragDrop onDragEnd={onDragEnd}>
        <Droppable
          className={styles.BoardCanvas}
          droppableId={BOARD_CANVAS_ID}
          type={DragDropTypes.List}
        >
          {currBoard.lists.map((list, index) => (
            <BoardList key={list.id} list={list} currListIndex={index} />
          ))}
        </Droppable>
      </DragDrop>
    </BoardCanvasContext.Provider>
  );
};

export default BoardCanvas;
