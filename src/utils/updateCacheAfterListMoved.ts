import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
  Reference,
} from '@apollo/client';

import { getBoardCacheId } from './getCacheId';
import removeRef from './removeRef';
import findOrderableRefInsertPosition from './findOrderableRefInsertPosition';
import insertRef from './insertRef';
import type {
  MoveListMutation,
  MoveListMutationVariables,
} from '../generated/graphql';

const updateCacheAfterListMoved: MutationUpdaterFunction<
  MoveListMutation,
  MoveListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }, { variables }) => {
  if (!data || !variables) return;

  const { id: movedListId, rank } = data.moveList;
  const { sourceBoardId, destinationBoardId } = variables;
  const sourceBoardCacheId = getBoardCacheId(sourceBoardId);

  if (sourceBoardId === destinationBoardId) {
    cache.modify({
      id: sourceBoardCacheId,
      fields: {
        lists(existingListRefs: Reference[], { readField }) {
          const [newListRefs, removedListRef] = removeRef(
            existingListRefs,
            movedListId,
            readField
          );

          if (!removedListRef) return newListRefs;

          const insertPosition = findOrderableRefInsertPosition(
            newListRefs,
            rank,
            readField
          );

          newListRefs.splice(insertPosition, 0, removedListRef);
          return newListRefs;
        },
      },
    });

    return;
  }

  let movedListRef: Reference | null = null;

  cache.modify({
    id: sourceBoardCacheId,
    fields: {
      lists(existingListRefs: Reference[], { readField }) {
        const [newListRefs, removedListRef] = removeRef(
          existingListRefs,
          movedListId,
          readField
        );

        movedListRef = removedListRef;
        return newListRefs;
      },
    },
  });

  cache.modify({
    id: getBoardCacheId(destinationBoardId),
    fields: {
      lists(existingListRefs: Reference[], { readField }) {
        if (!movedListRef) return existingListRefs;

        const insertPosition = findOrderableRefInsertPosition(
          existingListRefs,
          rank,
          readField
        );

        return insertRef(existingListRefs, movedListRef, insertPosition);
      },
    },
  });
};

export default updateCacheAfterListMoved;
