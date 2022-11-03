import { gql } from 'graphql.macro';

import { CARD_FRAGMENT } from '../../shared/fragments';

const ARCHIVE_ALL_CARDS = gql`
  mutation ArchiveAllCards($listId: String!) {
    archiveAllCards(listId: $listId) {
      ...Card
    }
  }

  ${CARD_FRAGMENT}
`;

export default ARCHIVE_ALL_CARDS;
