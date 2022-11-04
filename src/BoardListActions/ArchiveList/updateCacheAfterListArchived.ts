import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getBoardCacheId } from '../../utils/getCacheId';
import removeRef from '../../utils/removeRef';
import type {
  UpdateListMutation,
  UpdateListMutationVariables,
} from '../../generated/graphql';

const updateCacheAfterListArchived: MutationUpdaterFunction<
  UpdateListMutation,
  UpdateListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const { id, boardId } = data.updateList;

  cache.modify({
    id: getBoardCacheId(boardId),
    fields: {
      lists(existingListRefs: Reference[], { readField }) {
        const [newListRefs] = removeRef(existingListRefs, id, readField);

        return newListRefs;
      },
    },
  });
};

export default updateCacheAfterListArchived;
