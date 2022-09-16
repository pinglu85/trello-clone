import { Draggable } from '../../DragDrop';
import styles from './styles.module.css';
import type { CardProps } from './types';

const Card = ({ id, name }: CardProps): JSX.Element => {
  return (
    <Draggable
      draggableId={id}
      placeHolderClassName={styles.dragDropPlaceholder}
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
