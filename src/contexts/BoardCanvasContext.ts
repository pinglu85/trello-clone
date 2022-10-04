import { createContext } from 'react';

import type { List } from '../generated/graphql';

interface ListMap {
  [index: string]: List;
}

interface IBoardCanvasContext {
  listMap: ListMap;
  listOrder: string[];
  setListMap: React.Dispatch<React.SetStateAction<ListMap>>;
  reorderLists: ReorderLists;
}

const BoardCanvasContext = createContext<IBoardCanvasContext | null>(null);

export default BoardCanvasContext;

export type { ListMap };
