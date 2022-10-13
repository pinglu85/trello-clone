import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../BoardComponent/fragments';

const COPY_LIST = gql`
  ${CARD_FRAGMENT}

  mutation CopyList(
    $sourceListId: ID!
    $newListName: String!
    $newListRank: String!
  ) {
    copyList(
      sourceListId: $sourceListId
      newListName: $newListName
      newListRank: $newListRank
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

export default COPY_LIST;
