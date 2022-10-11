import { gql } from 'graphql.macro';

export const CARD_FRAGMENT = gql`
  fragment Card on Card {
    id
    boardId
    closed
    description
    listId
    name
    rank
  }
`;
