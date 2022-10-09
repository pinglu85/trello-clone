import { createContext } from 'react';

import { Card } from '../generated/graphql';

interface IBoardListContext {
  currListId: string;
  currListIdx: number;
  cardsInCurrList: Card[];
}

const BoardListContext = createContext<IBoardListContext | null>(null);

export default BoardListContext;
