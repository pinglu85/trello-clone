import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../BoardComponent/fragments';

const CREATE_LIST = gql`
  ${CARD_FRAGMENT}

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
      id
      boardId
      cards {
        ...Card
      }
      closed
      name
      rank
    }
  }
`;

export default CREATE_LIST;
