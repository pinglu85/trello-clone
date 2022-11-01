import { gql } from 'graphql.macro';

import { LIST_FRAGMENT_WITHOUT_CARDS } from './fragments';

export const MOVE_LIST = gql`
  mutation MoveList(
    $moveListId: ID!
    $sourceBoardId: String!
    $destinationBoardId: String!
    $newRank: String!
  ) {
    moveList(
      id: $moveListId
      sourceBoardId: $sourceBoardId
      destinationBoardId: $destinationBoardId
      newRank: $newRank
    ) {
      ...List
    }
  }

  ${LIST_FRAGMENT_WITHOUT_CARDS}
`;
