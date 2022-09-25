import { memo } from 'react';

import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListActions from '../BoardListActions';
import BoardListCardList from '../BoardListCardList';
import styles from './styles.module.css';

interface BoardListProps {
  id: string;
  name: string;
  cards: Card[];
  currListIdx: number;
}

const BoardList = ({
  id,
  name,
  cards,
  currListIdx,
}: BoardListProps): JSX.Element => {
  return (
    <Draggable
      draggableId={id}
      type={DragDropTypes.Column}
      idx={currListIdx}
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

            <BoardListActions currListIdx={currListIdx} />
          </div>

          <BoardListCardList listId={id} cards={cards} />

          <div className={styles.cardActions}>Add Cards</div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(BoardList);
