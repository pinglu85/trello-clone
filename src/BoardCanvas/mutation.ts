import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../shared/fragments';

export const MOVE_CARD = gql`
  mutation MoveCard(
    $moveCardId: ID!
    $sourceListId: String!
    $destinationBoardId: String!
    $destinationListId: String!
    $newRank: String!
  ) {
    moveCard(
      id: $moveCardId
      sourceListId: $sourceListId
      destinationBoardId: $destinationBoardId
      destinationListId: $destinationListId
      newRank: $newRank
    ) {
      ...Card
    }
  }

  ${CARD_FRAGMENT}
`;
