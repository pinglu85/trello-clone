import { memo } from 'react';

import BoardListContext from '../contexts/BoardListContext';
import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListActions from '../BoardListActions';
import BoardListCardList from '../BoardListCardList';
import styles from './styles.module.css';
import type { List } from '../generated/graphql';

interface BoardListProps {
  currListIndex: number;
  list: List;
}

type DivElementRef = React.MutableRefObject<HTMLDivElement | null>;

const BoardList = ({ currListIndex, list }: BoardListProps): JSX.Element => {
  return (
    <BoardListContext.Provider value={{ currListIndex, currList: list }}>
      <Draggable
        draggableId={list.id}
        type={DragDropTypes.List}
        index={currListIndex}
        placeholderClassName={styles.dragDropPlaceholder}
      >
        {({
          draggableProps: {
            draggableContainerRef,
            draggableRef,
            ...draggableProps
          },
          dragHandleProps: { dragHandleRef, ...dragHandleProps },
        }): JSX.Element => (
          <div
            ref={draggableContainerRef as DivElementRef}
            className={styles.listContainer}
            {...draggableProps}
          >
            <div ref={draggableRef as DivElementRef} className={styles.list}>
              <div
                ref={dragHandleRef as DivElementRef}
                className={styles.header}
                {...dragHandleProps}
              >
                <span className={styles.title}>{list.name}</span>

                <BoardListActions />
              </div>

              <BoardListCardList listId={list.id} cards={list.cards} />

              <div className={styles.cardActions}>Add Cards</div>
            </div>
          </div>
        )}
      </Draggable>
    </BoardListContext.Provider>
  );
};

export default memo(BoardList);
