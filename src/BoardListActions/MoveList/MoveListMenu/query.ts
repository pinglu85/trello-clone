import { gql } from 'graphql.macro';

import { LIST_FRAGMENT_WITHOUT_CARDS } from '../../../shared/fragments';

// We need to fetch `id` here, so that Apollo Client can add
// the field `lists` to the existing board on our cache.
const GET_BOARD_LISTS = gql`
  query GetBoardLists($boardId: ID!) {
    board(id: $boardId) {
      id
      lists {
        ...List
      }
    }
  }

  ${LIST_FRAGMENT_WITHOUT_CARDS}
`;

export default GET_BOARD_LISTS;
