import { gql } from 'graphql.macro';

import {
  LIST_FRAGMENT_WITHOUT_CARDS,
  CARD_FRAGMENT,
} from '../../shared/fragments';

const CREATE_LIST = gql`
  mutation CreateList(
    $boardId: String!
    $name: String!
    $rank: String!
    $sourceListId: ID
  ) {
    createList(
      boardId: $boardId
      name: $name
      rank: $rank
      sourceListId: $sourceListId
    ) {
      ...List
      cards {
        ...Card
      }
    }
  }

  ${LIST_FRAGMENT_WITHOUT_CARDS}
  ${CARD_FRAGMENT}
`;

export default CREATE_LIST;
