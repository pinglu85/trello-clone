import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../shared/fragments';

const MOVE_ALL_CARDS = gql`
  mutation MoveAllCards(
    $sourceListId: String!
    $destinationBoardId: String!
    $destinationListId: String!
  ) {
    moveAllCards(
      sourceListId: $sourceListId
      destinationBoardId: $destinationBoardId
      destinationListId: $destinationListId
    ) {
      ...Card
    }
  }

  ${CARD_FRAGMENT}
`;

export default MOVE_ALL_CARDS;
