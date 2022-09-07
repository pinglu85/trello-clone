interface List {
  id: String;
  name: String;
  closed: Boolean;
  boardId: String;
}

interface Card {
  id: String;
  boardId: String;
  listId: String;
  name: String;
}

interface BoardData {
  lists: List[];
  cards: Card[];
}
