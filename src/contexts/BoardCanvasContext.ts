import { createContext } from 'react';

import type { Board } from '../generated/graphql';
import type { BoardWithoutLists } from '../shared/types';

interface IBoardCanvasContext {
  currBoard: Board;
  boards: BoardWithoutLists[];
  reorderListsInCurrBoard: ReorderListsInCurrBoard;
}

const BoardCanvasContext = createContext<IBoardCanvasContext | null>(null);

export default BoardCanvasContext;
