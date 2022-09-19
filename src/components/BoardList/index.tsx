import { DragDropTypes, Draggable } from '../DragDrop';
import BoardListCards from '../BoardListCards';
import MoreIcon from './more-horizontal.svg';
import styles from './styles.module.css';
import type { BoardListProps } from './types';

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
        draggableProps: { ref, ...draggableProps },
        dragHandleProps,
      }): JSX.Element => (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.BoardList}
          {...draggableProps}
        >
          <div className={styles.header} {...dragHandleProps}>
            <span className={styles.title}>{name}</span>

            <button className={styles.moreButton}>
              <MoreIcon />
            </button>
          </div>

          <BoardListCards listId={id} cards={cards} />

          <div className={styles.cardActions}>Add Cards</div>
        </div>
      )}
    </Draggable>
  );
};

export default BoardList;
