interface PropsWithChildren {
  children: React.ReactNode;
}

interface List {
  id: string;
  name: string;
  closed: boolean;
  boardId: string;
}

interface Card {
  id: string;
  boardId: string;
  listId: string;
  name: string;
}

interface BoardData {
  lists: List[];
  cards: Card[];
}
