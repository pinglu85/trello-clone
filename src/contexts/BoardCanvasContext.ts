import { createContext } from 'react';

import type { List } from '../generated/graphql';

interface IBoardCanvasContext {
  lists: List[];
  reorderLists: ReorderLists;
}

const BoardCanvasContext = createContext<IBoardCanvasContext | null>(null);

export default BoardCanvasContext;
