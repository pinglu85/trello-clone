import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../Board';

export const MOVE_ALL_CARDS_IN_LIST = gql`
  ${CARD_FRAGMENT}

  mutation MoveAllCardsInList(
    $oldListId: String!
    $newBoardId: String!
    $newListId: String!
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
