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

const updateCacheAfterCardsMoved: MutationUpdaterFunction<
  MoveAllCardsInListMutation,
  MoveAllCardsInListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }, { variables }) => {
  if (!data || !variables) return;

  const { moveAllCardsInList: cards } = data;
  if (cards.length === 0) return;

  const { sourceListId, destinationListId } = variables;
  const sourceListCacheId = getListCacheId(sourceListId);
  const destinationListCacheId = getListCacheId(destinationListId);
  const cardsInDestinationList = readCardsFromCache(
    cache,
    destinationListCacheId
  );
  if (!cardsInDestinationList) return;

  cache.modify({
    id: sourceListCacheId,
    fields: {
      cards() {
        return <Reference[]>[];
      },
    },
  });

  const newCardsInDestinationList = [...cardsInDestinationList, ...cards];
  writeCardsToCache(cache, destinationListCacheId, newCardsInDestinationList);
};

export default updateCacheAfterCardsMoved;
