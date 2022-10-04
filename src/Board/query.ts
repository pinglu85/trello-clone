import { gql } from '@apollo/client';

const GET_BOARD = gql`
  query GetBoard($boardId: ID!) {
    board(id: $boardId) {
      id
      backgroundColor
      backgroundImage
      closed
      createdAt
      name
      updatedAt
      version
      lists {
        id
        boardId
        closed
        createdAt
        name
        rank
        updatedAt
        version
        cards {
          id
          boardId
          closed
          createdAt
          description
          listId
          name
          rank
          updatedAt
          version
        }
      }
    }
  }
`;

export default GET_BOARD;
