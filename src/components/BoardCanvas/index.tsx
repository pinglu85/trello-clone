import { useCallback, useState } from 'react';

import groupCardsByListId from './groupCardsByListId';
import reorderItems from './reorderItems';
import DragDrop, { Droppable, DragDropTypes } from '../DragDrop';
import BoardList from '../BoardList';
import styles from './styles.module.css';
import type { OnDragEnd } from '../DragDrop';

interface BoardCanvasProps {
  boardData: BoardData;
}

const BOARD_CANVAS_ID = 'boardCanvas';

const BoardCanvas = ({ boardData }: BoardCanvasProps): JSX.Element => {
  const [lists, setLists] = useState(boardData.lists);
  const [groupedCards, setGroupedCards] = useState(
    groupCardsByListId(boardData)
  );

  const reorderLists = useCallback(
    (sourceIdx: number, destinationIdx: number) => {
      setLists((prevLists) => {
        return reorderItems(
          prevLists,
          prevLists[sourceIdx],
          sourceIdx,
          destinationIdx
        );
      });
    },
    []
  );

  const reorderCards = useCallback(
    (
      sourceIdx: number,
      destinationIdx: number,
      oldParentId: string,
      newParentId: string
    ) => {
      setGroupedCards((prevGroupedCards) => {
        const oldParentCards = prevGroupedCards[oldParentId];
        const sourceItem = oldParentCards[sourceIdx];

        if (newParentId === oldParentId) {
          return {
            ...prevGroupedCards,
            [oldParentId]: reorderItems(
              oldParentCards,
              sourceItem,
              sourceIdx,
              destinationIdx
            ),
          };
        }

        const newParentCards = prevGroupedCards[newParentId];
        return {
          ...prevGroupedCards,
          [newParentId]: reorderItems(
            newParentCards,
            sourceItem,
            -1,
            destinationIdx
          ),
          [oldParentId]: oldParentCards.filter((_, idx) => idx !== sourceIdx),
        };
      });
    },
    []
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
    <DragDrop onDragEnd={onDragEnd}>
      <Droppable
        className={styles.BoardCanvas}
        droppableId={BOARD_CANVAS_ID}
        type={DragDropTypes.Column}
      >
        {lists.map(({ id, name }, idx) => (
          <BoardList
            key={id}
            id={id}
            name={name}
            cards={groupedCards[id]}
            idx={idx}
            numOfLists={lists.length}
          />
        ))}
      </Droppable>
    </DragDrop>
  );
};

export default BoardCanvas;
