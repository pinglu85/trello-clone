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

export const LIST_FRAGMENT_WITHOUT_CARDS = gql`
  fragment List on List {
    id
    boardId
    closed
    name
    rank
  }
`;

export const BOARD_FRAGMENT_WITHOUT_LISTS = gql`
  fragment Board on Board {
    id
    backgroundColor
    backgroundImage
    closed
    name
  }
`;
