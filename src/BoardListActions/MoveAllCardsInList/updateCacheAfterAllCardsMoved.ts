import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import getListCacheId from '../../utils/getListCacheId';
import type {
  MoveAllCardsInListMutation,
  MoveAllCardsInListMutationVariables,
} from '../../generated/graphql';
import {
  readCardsFromCache,
  writeCardsToCache,
} from '../../utils/readWriteCardsInCache';

const updateCacheAfterAllCardsMoved: MutationUpdaterFunction<
  MoveAllCardsInListMutation,
  MoveAllCardsInListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const { oldListId, cards } = data.moveAllCardsInList;
  if (cards.length === 0) return;

  const oldListCacheId = getListCacheId(oldListId);
  const currListId = cards[0].listId;
  const currListCacheId = getListCacheId(currListId);
  const cardsInCurrList = readCardsFromCache(cache, currListCacheId);
  if (!cardsInCurrList) return;

  cache.modify({
    id: oldListCacheId,
    fields: {
      cards() {
        return <Reference[]>[];
      },
    },
  });

  const newCardsForCurrList = [...cardsInCurrList, ...cards];
  writeCardsToCache(cache, currListCacheId, newCardsForCurrList);
};

export default updateCacheAfterAllCardsMoved;
