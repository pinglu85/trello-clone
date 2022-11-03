import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getListCacheId } from '../../utils/getCacheId';
import type {
  ArchiveAllCardsMutation,
  ArchiveAllCardsMutationVariables,
} from '../../generated/graphql';

const updateCacheAfterCardsArchived: MutationUpdaterFunction<
  ArchiveAllCardsMutation,
  ArchiveAllCardsMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }, { variables }) => {
  if (!data || !variables) return;

  const { archiveAllCards: archivedCards } = data;
  if (archivedCards.length === 0) return;

  const archivedCardIds = new Set<string>();
  for (const { id } of archivedCards) {
    archivedCardIds.add(id);
  }

  const { listId } = variables;

  cache.modify({
    id: getListCacheId(listId),
    fields: {
      cards(existingCardsRef: Reference[], { readField }) {
        return existingCardsRef.filter((cardRef) => {
          const id = readField<string>('id', cardRef);

          return id && !archivedCardIds.has(id);
        });
      },
    },
  });
};

export default updateCacheAfterCardsArchived;
