import { createContext } from 'react';

interface IBoardListContext {
  currListId: string;
  currListIdx: number;
}

const BoardListContext = createContext<IBoardListContext | null>(null);

export default BoardListContext;
