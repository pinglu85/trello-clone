import { createContext } from 'react';

interface IBoardCanvasContext {
  listMap: ListMap;
  listOrder: string[];
  setListMap: React.Dispatch<React.SetStateAction<ListMap>>;
  reorderLists: ReorderLists;
}

const BoardCanvasContext = createContext<IBoardCanvasContext | null>(null);

export default BoardCanvasContext;
