import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getListCacheId } from '../../utils/getCacheId';
import type {
  MoveAllCardsMutation,
  MoveAllCardsMutationVariables,
} from '../../generated/graphql';

const updateCacheAfterCardsMoved: MutationUpdaterFunction<
  MoveAllCardsMutation,
  MoveAllCardsMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }, { variables }) => {
  if (!data || !variables || data.moveAllCards.length === 0) {
    return;
  }

  const { sourceListId, destinationListId } = variables;
  let movedCardRefs: Reference[] | null = null;

  cache.modify({
    id: getListCacheId(sourceListId),
    fields: {
      cards(existingCardRefs: Reference[]) {
        movedCardRefs = existingCardRefs;
        return [];
      },
    },
  });

  cache.modify({
    id: getListCacheId(destinationListId),
    fields: {
      cards(existingCardRefs: Reference[]) {
        if (!movedCardRefs) return existingCardRefs;

        return [...existingCardRefs, ...movedCardRefs];
      },
    },
  });
};

export default updateCacheAfterCardsMoved;
