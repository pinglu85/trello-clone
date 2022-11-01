import type { Board, List } from '../generated/graphql';

export type BoardWithoutLists = Omit<Board, 'lists'>;

export type ListWithoutCards = Omit<List, 'cards'>;
