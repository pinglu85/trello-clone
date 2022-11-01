import { gql } from 'graphql.macro';

import { BOARD_FRAGMENT_WITHOUT_LISTS } from '../shared/fragments';

const GET_BOARDS = gql`
  query GetBoards($closed: Boolean!) {
    boards(closed: $closed) {
      ...Board
    }
  }

  ${BOARD_FRAGMENT_WITHOUT_LISTS}
`;

export default GET_BOARDS;
