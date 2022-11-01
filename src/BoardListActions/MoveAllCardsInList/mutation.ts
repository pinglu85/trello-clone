import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../shared/fragments';

export const MOVE_ALL_CARDS_IN_LIST = gql`
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

  ${CARD_FRAGMENT}
`;
