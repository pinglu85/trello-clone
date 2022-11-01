import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../shared/fragments';

export const MOVE_CARD = gql`
  mutation MoveCard(
    $moveCardId: ID!
    $newBoardId: String!
    $newListId: String!
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

  ${CARD_FRAGMENT}
`;
