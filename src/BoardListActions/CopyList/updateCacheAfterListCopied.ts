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
  CopyListMutation,
  CopyListMutationVariables,
} from '../../generated/graphql';

const updateCacheAfterListCopied: MutationUpdaterFunction<
  CopyListMutation,
  CopyListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const newList = data.copyList;
  const boardId = newList.boardId;
  const board = readBoardFromCache(cache, boardId);
  if (!board) return;

  const newLists = [...board.lists];
  const insertPosition = findInsertPositionByRank(newLists, newList.rank);
  newLists.splice(insertPosition, 0, newList);

  const newBoard = { ...board, lists: newLists };
  writeBoardToCache(cache, boardId, newBoard);
};

export default updateCacheAfterListCopied;
