import { DragDropTypes, Draggable } from '../../DragDrop';
import styles from './styles.module.css';
import type { CardProps } from './types';

const Card = ({ id, name, idx }: CardProps): JSX.Element => {
  return (
    <Draggable
      draggableId={id}
      type={DragDropTypes.Row}
      idx={idx}
      placeholderClassName={styles.dragDropPlaceholder}
    >
      {({
        draggableProps: { ref, ...draggableProps },
        dragHandleProps,
      }): JSX.Element => (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={styles.Card}
          {...draggableProps}
          {...dragHandleProps}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
