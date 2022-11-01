import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getListCacheId } from '../../utils/getCacheId';
import {
  readListCardsFromCache,
  writeListCardsToCache,
} from '../../utils/readWriteListCardsInCache';
import type {
  MoveAllCardsInListMutation,
  MoveAllCardsInListMutationVariables,
} from '../../generated/graphql';

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
  const cardsInDestinationList = readListCardsFromCache(
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
  writeListCardsToCache(
    cache,
    destinationListCacheId,
    newCardsInDestinationList
  );
};

export default updateCacheAfterCardsMoved;
