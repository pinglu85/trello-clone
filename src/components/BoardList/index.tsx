import { memo } from 'react';

import BoardListContext from '../../contexts/BoardListContext';
import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListActions from '../BoardListActions';
import BoardListCardList from '../BoardListCardList';
import styles from './styles.module.css';

interface BoardListProps {
  id: string;
  name: string;
  cards: Card[];
  idx: number;
  numOfLists: number;
  reorderLists: ReorderLists;
}

const BoardList = ({
  id,
  name,
  cards,
  idx,
  numOfLists,
  reorderLists,
}: BoardListProps): JSX.Element => {
  return (
    <BoardListContext.Provider
      value={{
        currListIdx: idx,
        numOfLists,
        reorderLists,
      }}
    >
      <Draggable
        draggableId={id}
        type={DragDropTypes.Column}
        idx={idx}
        placeholderClassName={styles.dragDropPlaceholder}
      >
        {({
          draggableProps: { draggableRef, ...draggableProps },
          dragHandleProps,
        }): JSX.Element => (
          <div
            ref={draggableRef as React.RefObject<HTMLDivElement>}
            className={styles.BoardList}
            {...draggableProps}
          >
            <div className={styles.header} {...dragHandleProps}>
              <span className={styles.title}>{name}</span>

              <BoardListActions />
            </div>

            <BoardListCardList listId={id} cards={cards} />

            <div className={styles.cardActions}>Add Cards</div>
          </div>
        )}
      </Draggable>
    </BoardListContext.Provider>
  );
};

export default memo(BoardList);
