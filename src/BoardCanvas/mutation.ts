import { gql } from '@apollo/client';

import { CARD_FRAGMENT } from '../Board/fragments';

export const MOVE_LIST = gql`
  mutation MoveList($moveListId: ID!, $newBoardId: Int!, $newRank: String!) {
    moveList(id: $moveListId, newBoardId: $newBoardId, newRank: $newRank) {
      id
      boardId
      oldBoardId
      rank
    }
  }
`;

export const MOVE_CARD = gql`
  ${CARD_FRAGMENT}

  mutation MoveCard(
    $moveCardId: ID!
    $newBoardId: Int!
    $newListId: Int!
    $newRank: String!
  ) {
    moveCard(
      id: $moveCardId
      newBoardId: $newBoardId
      newListId: $newListId
      newRank: $newRank
    ) {
      oldListId
      card {
        ...Card
      }
    }
  }
`;
