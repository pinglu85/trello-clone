import { memo } from 'react';

import { DragDropTypes, Draggable } from '../../DragDrop';
import styles from './styles.module.css';

interface BoardListCardProps {
  id: string;
  name: string;
  idx: number;
}

const BoardListCard = ({ id, name, idx }: BoardListCardProps): JSX.Element => {
  return (
    <Draggable
      draggableId={id}
      type={DragDropTypes.Row}
      idx={idx}
      placeholderClassName={styles.dragDropPlaceholder}
    >
      {({
        draggableProps: { draggableRef, ...draggableProps },
        dragHandleProps: { dragHandleRef, ...dragHandleProps },
      }): JSX.Element => (
        <div
          ref={(element): void => {
            draggableRef.current = element;
            dragHandleRef.current = element;
          }}
          className={styles.BoardListCard}
          {...draggableProps}
          {...dragHandleProps}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

export default memo(BoardListCard);
