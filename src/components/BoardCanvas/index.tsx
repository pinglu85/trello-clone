import { useCallback, useState } from 'react';

import groupCardsByListId from './utils/groupCardsByListId';
import reorderItems from './utils/reorderItems';
import insertItem from './utils/insertItem';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
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

  const reorderLists: ReorderLists = useCallback(
    (sourceIdx, destinationIdx) => {
      setLists((prevLists) => {
        return reorderItems(prevLists, sourceIdx, destinationIdx);
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

        if (newParentId === oldParentId) {
          return {
            ...prevGroupedCards,
            [oldParentId]: reorderItems(
              oldParentCards,
              sourceIdx,
              destinationIdx
            ),
          };
        }

        const sourceItem = oldParentCards[sourceIdx];
        const newParentCards = prevGroupedCards[newParentId];
        return {
          ...prevGroupedCards,
          [newParentId]: insertItem(newParentCards, sourceItem, destinationIdx),
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
    <BoardCanvasContext.Provider
      value={{ lists, groupedCards, setGroupedCards, reorderLists }}
    >
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
              currListIdx={idx}
            />
          ))}
        </Droppable>
      </DragDrop>
    </BoardCanvasContext.Provider>
  );
};

export default BoardCanvas;
