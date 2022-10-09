import { gql } from '@apollo/client';

import { CARD_FRAGMENT } from '../../Board';

export const MOVE_ALL_CARDS_IN_LIST = gql`
  ${CARD_FRAGMENT}

  mutation MoveAllCardsInList(
    $oldListId: Int!
    $newBoardId: Int!
    $newListId: Int!
    $newRankMap: JSONObject!
  ) {
    moveAllCardsInList(
      oldListId: $oldListId
      newBoardId: $newBoardId
      newListId: $newListId
      newRankMap: $newRankMap
    ) {
      oldListId
      cards {
        ...Card
      }
    }
  }
`;
