import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from './fragments';

const GET_BOARD = gql`
  ${CARD_FRAGMENT}

  query GetBoard($boardId: ID!) {
    board(id: $boardId) {
      id
      backgroundColor
      backgroundImage
      closed
      name
      lists {
        id
        boardId
        closed
        name
        rank
        cards {
          ...Card
        }
      }
    }
  }
`;

export default GET_BOARD;
