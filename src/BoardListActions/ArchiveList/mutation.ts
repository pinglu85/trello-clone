import { gql } from 'graphql.macro';

import { LIST_FRAGMENT_WITHOUT_CARDS } from '../../shared/fragments';

const UPDATE_LIST = gql`
  mutation UpdateList($updateListId: ID!, $updates: ListUpdates!) {
    updateList(id: $updateListId, updates: $updates) {
      ...List
    }
  }

  ${LIST_FRAGMENT_WITHOUT_CARDS}
`;

export default UPDATE_LIST;
