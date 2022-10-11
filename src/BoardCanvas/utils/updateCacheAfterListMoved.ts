import type {
  ApolloCache,
  DefaultContext,
  MutationUpdaterFunction,
} from '@apollo/client';

import GET_BOARD from '../../BoardComponent/query';
import searchInsertPosition from './searchInsertPosition';
import type {
  MoveListMutation,
  MoveListMutationVariables,
  GetBoardQuery,
  GetBoardQueryVariables,
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
  const boardIdString = String(boardId);
  const cachedBoardData = cache.readQuery<
    GetBoardQuery,
    GetBoardQueryVariables
  >({
    query: GET_BOARD,
    variables: {
      boardId: boardIdString,
    },
  });
  if (!cachedBoardData) return;

  const { board } = cachedBoardData;
  const [newLists, removedList] = removeList(board.lists, movedListId);
  if (!removedList) return;

  const insertPosition = searchInsertPosition(newLists, rank);
  newLists.splice(insertPosition, 0, { ...removedList, boardId, rank });

  cache.writeQuery<GetBoardQuery, GetBoardQueryVariables>({
    query: GET_BOARD,
    variables: {
      boardId: boardIdString,
    },
    data: { board: { ...board, lists: newLists } },
  });
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
