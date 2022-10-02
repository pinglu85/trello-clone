interface Board {
  id: string;
  backgroundColor: string | null;
  backgroundImage: string | null;
  closed: boolean;
  createdAt: string;
  name: string;
  updatedAt: string;
  version: number;
}

interface List {
  id: string;
  boardId: string;
  closed: boolean;
  createdAt: string;
  name: string;
  rank: string;
  updatedAt: string;
  version: number;
}

interface Card {
  id: string;
  boardId: string;
  closed: boolean;
  createdAt: string;
  description: string | null;
  listId: string;
  name: string;
  rank: string;
  updatedAt: string;
  version: number;
}

interface ListWithCards extends List {
  cards: Card[];
}
interface BoardWithListsAndCards extends Board {
  lists: ListWithCards[];
}

interface ListMap {
  [index: string]: ListWithCards;
}

type ReorderLists = (sourceIdx: number, destinationIdx: number) => void;
