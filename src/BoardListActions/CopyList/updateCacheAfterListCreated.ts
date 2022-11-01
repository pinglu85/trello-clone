import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getBoardCacheId } from '../../utils/getCacheId';
import findOrderableRefInsertPosition from '../../utils/findOrderableRefInsertPosition';
import { LIST_TYPENAME } from '../../constants/graphql';
import insertRef from '../../utils/insertRef';
import type {
  CreateListMutation,
  CreateListMutationVariables,
} from '../../generated/graphql';

const updateCacheAfterListCreated: MutationUpdaterFunction<
  CreateListMutation,
  CreateListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const { id, boardId, rank } = data.createList;
  const boardCacheId = getBoardCacheId(boardId);

  cache.modify({
    id: boardCacheId,
    fields: {
      lists(existingListRefs: Reference[], { readField, toReference }) {
        const insertPosition = findOrderableRefInsertPosition(
          existingListRefs,
          rank,
          readField
        );

        const newListRef = toReference({
          __typename: LIST_TYPENAME,
          id,
        });

        if (!newListRef) return existingListRefs;

        return insertRef(existingListRefs, newListRef, insertPosition);
      },
    },
  });
};

export default updateCacheAfterListCreated;
