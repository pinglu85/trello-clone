import { memo } from 'react';

import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListCardList from '../BoardListCardList';
import MoreIcon from './more-horizontal.svg';
import styles from './styles.module.css';

interface BoardListProps {
  id: string;
  name: string;
  cards: Card[];
  idx: number;
  numOfLists: number;
}

const BoardList = ({
  id,
  name,
  cards,
  idx,
  numOfLists,
}: BoardListProps): JSX.Element => {
  return (
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

            <button className={styles.moreButton}>
              <MoreIcon />
            </button>
          </div>

          <BoardListCardList listId={id} cards={cards} />

          <div className={styles.cardActions}>Add Cards</div>
        </div>
      )}
    </Draggable>
  );
};

export default memo(BoardList);
