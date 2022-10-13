import { memo } from 'react';

import BoardListContext from '../contexts/BoardListContext';
import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListActions from '../BoardListActions';
import BoardListCardList from '../BoardListCardList';
import styles from './styles.module.css';
import type { List } from '../generated/graphql';

interface BoardListProps {
  currListIdx: number;
  list: List;
}

const BoardList = ({ currListIdx, list }: BoardListProps): JSX.Element => {
  return (
    <BoardListContext.Provider value={{ currListIdx, currList: list }}>
      <Draggable
        draggableId={list.id}
        type={DragDropTypes.Column}
        idx={currListIdx}
        placeholderClassName={styles.dragDropPlaceholder}
      >
        {({
          draggableProps: { draggableRef, ...draggableProps },
          dragHandleProps: { dragHandleRef, ...dragHandleProps },
        }): JSX.Element => (
          <div
            ref={draggableRef as React.MutableRefObject<HTMLDivElement | null>}
            className={styles.BoardList}
            {...draggableProps}
          >
            <div
              ref={
                dragHandleRef as React.MutableRefObject<HTMLDivElement | null>
              }
              className={styles.header}
              {...dragHandleProps}
            >
              <span className={styles.title}>{list.name}</span>

              <BoardListActions />
            </div>

            <BoardListCardList listId={list.id} cards={list.cards} />

            <div className={styles.cardActions}>Add Cards</div>
          </div>
        )}
      </Draggable>
    </BoardListContext.Provider>
  );
};

export default memo(BoardList);
