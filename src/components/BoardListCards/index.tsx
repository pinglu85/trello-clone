import { Droppable, DragDropTypes } from '../DragDrop';
import Card from './Card';
import styles from './styles.module.css';
import type { BoardListCardsProps } from './types';

const BoardListCards = ({
  listId,
  cards,
}: BoardListCardsProps): JSX.Element => {
  return (
    <Droppable
      className={styles.BoardListCards}
      droppableId={listId}
      type={DragDropTypes.Row}
    >
      {cards.map(({ id, name }, idx) => (
        <Card key={id} id={id} name={name} idx={idx} />
      ))}
    </Droppable>
  );
};

export default BoardListCards;
