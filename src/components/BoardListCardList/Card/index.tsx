import { memo } from 'react';

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
        draggableProps: { draggableRef, ...draggableProps },
        dragHandleProps,
      }): JSX.Element => (
        <div
          ref={draggableRef as React.RefObject<HTMLDivElement>}
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

export default memo(Card);
