import { gql } from 'graphql.macro';
import type { ApolloCache } from '@apollo/client';

import { CARD_FRAGMENT } from '../shared/fragments';
import type { Card, List } from '../generated/graphql';

const CARDS_PART_ON_LIST_FRAGMENT = gql`
  fragment CardsPart on List {
    cards {
      ...Card
    }
  }

  ${CARD_FRAGMENT}
`;

function readListCardsFromCache(
  cache: ApolloCache<unknown>,
  listCacheId: string
): Card[] | null {
  const list = cache.readFragment<List>({
    id: listCacheId,
    fragment: CARDS_PART_ON_LIST_FRAGMENT,
    fragmentName: 'CardsPart',
  });

  return list && list.cards;
}

function writeListCardsToCache(
  cache: ApolloCache<unknown>,
  listCacheId: string,
  cards: Card[]
): void {
  cache.writeFragment({
    id: listCacheId,
    fragment: CARDS_PART_ON_LIST_FRAGMENT,
    fragmentName: 'CardsPart',
    data: {
      cards,
    },
  });
}

export { readListCardsFromCache, writeListCardsToCache };
