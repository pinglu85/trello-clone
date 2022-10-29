import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../BoardComponent';

export const MOVE_ALL_CARDS_IN_LIST = gql`
  ${CARD_FRAGMENT}

  mutation MoveAllCardsInList(
    $sourceListId: String!
    $destinationBoardId: String!
    $destinationListId: String!
  ) {
    moveAllCardsInList(
      sourceListId: $sourceListId
      destinationBoardId: $destinationBoardId
      destinationListId: $destinationListId
    ) {
      ...Card
    }
  }
`;
