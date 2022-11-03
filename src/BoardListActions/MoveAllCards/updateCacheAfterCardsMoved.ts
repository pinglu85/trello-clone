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
  if (!data || !variables) return;

  const { moveAllCards: movedCards } = data;
  if (movedCards.length === 0) return;

  const movedCardIds = new Set<string>();
  for (const { id } of movedCards) {
    movedCardIds.add(id);
  }

  const { sourceListId, destinationListId } = variables;
  const movedCardRefs: Reference[] = [];

  cache.modify({
    id: getListCacheId(sourceListId),
    fields: {
      cards(existingCardRefs: Reference[], { readField }) {
        const newCardRefs: Reference[] = [];

        for (const cardRef of existingCardRefs) {
          const id = readField<string>('id', cardRef);

          if (id && movedCardIds.has(id)) {
            movedCardRefs.push(cardRef);
          } else {
            newCardRefs.push(cardRef);
          }
        }

        return newCardRefs;
      },
    },
  });

  cache.modify({
    id: getListCacheId(destinationListId),
    fields: {
      cards(existingCardRefs: Reference[]) {
        return [...existingCardRefs, ...movedCardRefs];
      },
    },
  });
};

export default updateCacheAfterCardsMoved;
