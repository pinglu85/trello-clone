import { gql } from 'graphql.macro';

import {
  BOARD_FRAGMENT_WITHOUT_LISTS,
  CARD_FRAGMENT,
  LIST_FRAGMENT_WITHOUT_CARDS,
} from '../shared/fragments';

const GET_BOARDS_AND_BOARD = gql`
  query GetBoardsAndBoard($closed: Boolean!, $boardId: ID!) {
    boards(closed: $closed) {
      ...Board
    }
    board(id: $boardId) {
      ...Board
      lists {
        ...List
        cards {
          ...Card
        }
      }
    }
  }

  ${BOARD_FRAGMENT_WITHOUT_LISTS}
  ${LIST_FRAGMENT_WITHOUT_CARDS}
  ${CARD_FRAGMENT}
`;

export default GET_BOARDS_AND_BOARD;
