import { createContext } from 'react';

interface IBoardCanvasContext {
  lists: List[];
  groupedCards: GroupedCards;
  setGroupedCards: React.Dispatch<React.SetStateAction<GroupedCards>>;
  reorderLists: ReorderLists;
}

const BoardCanvasContext = createContext<IBoardCanvasContext | null>(null);

export default BoardCanvasContext;
