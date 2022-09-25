import { createContext } from 'react';

interface IBoardListContext {
  currListIdx: number;
  numOfLists: number;
  reorderLists: ReorderLists;
}

const BoardListContext = createContext<IBoardListContext | null>(null);

export default BoardListContext;
