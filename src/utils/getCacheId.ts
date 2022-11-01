import { BOARD_TYPENAME, LIST_TYPENAME } from '../constants/graphql';

function getBoardCacheId(boardId: string): string {
  return `${BOARD_TYPENAME}:${boardId}`;
}

function getListCacheId(listId: string): string {
  return `${LIST_TYPENAME}:${listId}`;
}

export { getListCacheId, getBoardCacheId };
