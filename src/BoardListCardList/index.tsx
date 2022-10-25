import { Droppable, DragDropTypes } from '../DragDrop';
import joinClassNames from '../utils/joinClassNames';
import BoardListCard from './BoardListCard';
import styles from './styles.module.css';
import type { Card } from '../generated/graphql';

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
      className={joinClassNames(styles.BoardListCardList, 'verticalScrollbar')}
      droppableId={listId}
      type={DragDropTypes.Card}
    >
      {cards.map(({ id, name }, index) => (
        <BoardListCard key={id} id={id} name={name} index={index} />
      ))}
    </Droppable>
  );
};

export default BoardListCardList;
