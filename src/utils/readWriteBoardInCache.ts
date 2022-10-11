import type { ApolloCache } from '@apollo/client';

import { GET_BOARD } from '../BoardComponent';
import type {
  Board,
  GetBoardQuery,
  GetBoardQueryVariables,
} from '../generated/graphql';

function readBoardFromCache(
  cache: ApolloCache<unknown>,
  boardId: string
): Board | null {
  const data = cache.readQuery<GetBoardQuery, GetBoardQueryVariables>({
    query: GET_BOARD,
    variables: {
      boardId,
    },
  });

  return data && data.board;
}

function writeBoardToCache(
  cache: ApolloCache<unknown>,
  boardId: string,
  board: Board
): void {
  cache.writeQuery<GetBoardQuery, GetBoardQueryVariables>({
    query: GET_BOARD,
    variables: {
      boardId,
    },
    data: { board },
  });
}

export { readBoardFromCache, writeBoardToCache };
