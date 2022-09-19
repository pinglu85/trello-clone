import { useCallback, useState } from 'react';

import groupCardsByListId from './groupCardsByListId';
import { BOARD_CANVAS_ID } from './constants';
import { reorderGroupedCards, reorderItems } from './reorder';
import DragDrop, { Droppable, DragDropTypes } from '../DragDrop';
import BoardList from '../BoardList';
import styles from './styles.module.css';
import type { BoardCanvasProps } from './types';
import type { OnDragEnd } from '../DragDrop';

const BoardCanvas = ({ boardData }: BoardCanvasProps): JSX.Element => {
  const [lists, setLists] = useState(boardData.lists);
  const [groupedCards, setGroupedCards] = useState(
    groupCardsByListId(boardData)
  );

  const onDragEnd: OnDragEnd = useCallback(
    ({ sourceIdx, destinationIdx, oldParentId, newParentId }) => {
      if (destinationIdx === -1) return;

      if (newParentId === oldParentId && destinationIdx === sourceIdx) {
        return;
      }

      if (oldParentId === BOARD_CANVAS_ID) {
        setLists((prevLists) => {
          return reorderItems(
            prevLists,
            prevLists[sourceIdx],
            sourceIdx,
            destinationIdx
          );
        });
      } else {
        setGroupedCards((prevGroupedCards) => {
          return reorderGroupedCards(
            prevGroupedCards,
            sourceIdx,
            destinationIdx,
            oldParentId,
            newParentId
          );
        });
      }
    },
    []
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
          ></BoardList>
        ))}
      </Droppable>
    </DragDrop>
  );
};

export default BoardCanvas;
