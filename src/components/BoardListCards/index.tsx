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
        // When moving a card from top to bottom within a scrollable list,
        // the card is not scrolled into the view when the user has finished
        // the drag operation. To solve this we use the index of each card
        // as `key`.
        <Card key={idx} id={id} name={name} idx={idx} />
      ))}
    </Droppable>
  );
};

export default BoardListCards;
