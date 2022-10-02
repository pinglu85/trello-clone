import { useCallback, useState } from 'react';

import createListMap from './utils/createListMap';
import generateInitListOrder from './utils/generateInitListOrder';
import reorderItems from './utils/reorderItems';
import insertItem from './utils/insertItem';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import DragDrop, { Droppable, DragDropTypes } from '../DragDrop';
import BoardList from '../BoardList';
import styles from './styles.module.css';
import type { OnDragEnd } from '../DragDrop';

interface BoardCanvasProps {
  board: BoardWithListsAndCards;
}

const BOARD_CANVAS_ID = 'boardCanvas';

const BoardCanvas = ({ board }: BoardCanvasProps): JSX.Element => {
  const [listMap, setListMap] = useState(createListMap(board.lists));
  const [listOrder, setListOrder] = useState(
    generateInitListOrder(board.lists)
  );

  const reorderLists: ReorderLists = useCallback(
    (sourceIdx, destinationIdx) => {
      setListOrder((prevListOrder) => {
        return reorderItems(prevListOrder, sourceIdx, destinationIdx);
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
      setListMap((prevListMap) => {
        const oldParentCards = prevListMap[oldParentId].cards;

        if (newParentId === oldParentId) {
          return {
            ...prevListMap,
            [oldParentId]: {
              ...prevListMap[oldParentId],
              cards: reorderItems(oldParentCards, sourceIdx, destinationIdx),
            },
          };
        }

        const sourceItem = oldParentCards[sourceIdx];
        const newParentCards = prevListMap[newParentId].cards;
        return {
          ...prevListMap,
          [newParentId]: {
            ...prevListMap[newParentId],
            cards: insertItem(newParentCards, sourceItem, destinationIdx),
          },
          [oldParentId]: {
            ...prevListMap[oldParentId],
            cards: oldParentCards.filter((_, idx) => idx !== sourceIdx),
          },
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
      value={{ listMap, listOrder, setListMap, reorderLists }}
    >
      <DragDrop onDragEnd={onDragEnd}>
        <Droppable
          className={styles.BoardCanvas}
          droppableId={BOARD_CANVAS_ID}
          type={DragDropTypes.Column}
        >
          {listOrder.map((id, idx) => (
            <BoardList key={id} id={id} list={listMap[id]} currListIdx={idx} />
          ))}
        </Droppable>
      </DragDrop>
    </BoardCanvasContext.Provider>
  );
};

export default BoardCanvas;
