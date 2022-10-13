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
  MoveListMutation,
  MoveListMutationVariables,
  List,
} from '../../generated/graphql';

const updateCacheAfterListMoved: MutationUpdaterFunction<
  MoveListMutation,
  MoveListMutationVariables,
  DefaultContext,
  ApolloCache<unknown>
> = (cache, { data }) => {
  if (!data) return;

  const { id: movedListId, boardId, rank } = data.moveList;
  const board = readBoardFromCache(cache, boardId);
  if (!board) return;

  const [newLists, removedList] = removeList(board.lists, movedListId);
  if (!removedList) return;

  const insertPosition = findInsertPositionByRank(newLists, rank);
  newLists.splice(insertPosition, 0, { ...removedList, boardId, rank });

  const newBoard = { ...board, lists: newLists };
  writeBoardToCache(cache, boardId, newBoard);
};

function removeList(
  lists: List[],
  targetId: string
): [newLists: List[], removedList: List | null] {
  const newLists: List[] = [];
  let removedList: List | null = null;

  for (const list of lists) {
    if (list.id === targetId) {
      removedList = list;
    } else {
      newLists.push(list);
    }
  }

  return [newLists, removedList];
}

export default updateCacheAfterListMoved;
