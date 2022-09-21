import { Droppable, DragDropTypes } from '../DragDrop';
import Card from './Card';
import styles from './styles.module.css';

interface BoardListCardListProps {
  listId: string;
  cards: Card[];
}

const BoardListCardList = ({
  listId,
  cards,
}: BoardListCardListProps): JSX.Element => {
  return (
    <Droppable
      className={`${styles.BoardListCardList} verticalScrollbar`}
      droppableId={listId}
      type={DragDropTypes.Row}
    >
      {cards.map(({ id, name }, idx) => (
        <Card key={id} id={id} name={name} idx={idx} />
      ))}
    </Droppable>
  );
};

export default BoardListCardList;
