import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from '@apollo/client';

import {
  readBoardFromCache,
  writeBoardToCache,
} from '../../utils/readWriteBoardInCache';
import findInsertPositionByRank from '../../utils/findInsertPositionByRank';
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

  const { createList: list } = data;
  const { boardId } = list;
  const board = readBoardFromCache(cache, boardId);
  if (!board) return;

  const newLists = [...board.lists];
  const insertPosition = findInsertPositionByRank(newLists, list.rank);
  newLists.splice(insertPosition, 0, list);

  const newBoard = { ...board, lists: newLists };
  writeBoardToCache(cache, boardId, newBoard);
};

export default updateCacheAfterListCreated;
