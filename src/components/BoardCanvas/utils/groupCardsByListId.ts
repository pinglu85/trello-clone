import type { GroupedCards } from '../types';

function groupCardsByListId({ lists, cards }: BoardData): GroupedCards {
  const groupedCards = lists.reduce((groupedCards, list) => {
    groupedCards[list.id] = <Card[]>[];
    return groupedCards;
  }, <GroupedCards>{});

  for (const card of cards) {
    groupedCards[card.listId].push(card);
  }

  return groupedCards;
}

export default groupCardsByListId;
