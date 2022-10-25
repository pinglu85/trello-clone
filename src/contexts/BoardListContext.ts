import { createContext } from 'react';

import { List } from '../generated/graphql';

interface IBoardListContext {
  currListIndex: number;
  currList: List;
}

const BoardListContext = createContext<IBoardListContext | null>(null);

export default BoardListContext;
