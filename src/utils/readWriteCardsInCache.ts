import { gql } from 'graphql.macro';
import type { ApolloCache } from '@apollo/client';

import { CARD_FRAGMENT } from '../Board';
import type { Card, List } from '../generated/graphql';

const LIST_FRAGMENT = gql`
  ${CARD_FRAGMENT}

  fragment List on List {
    cards {
      ...Card
    }
  }
`;

function readCardsFromCache(
  cache: ApolloCache<unknown>,
  listCacheId: string
): Card[] | null {
  const list = cache.readFragment<List>({
    id: listCacheId,
    fragment: LIST_FRAGMENT,
    fragmentName: 'List',
  });

  return list && list.cards;
}

function writeCardsToCache(
  cache: ApolloCache<unknown>,
  listCacheId: string,
  cards: Card[]
): void {
  cache.writeFragment({
    id: listCacheId,
    fragment: LIST_FRAGMENT,
    fragmentName: 'List',
    data: {
      cards,
    },
  });
}

export { readCardsFromCache, writeCardsToCache };
