import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import BoardListContext from '../../contexts/BoardListContext';
import { DropdownContext } from '../../common/Dropdown';
import UPDATE_LIST from './mutation';
import updateCacheAfterListArchived from './updateCacheAfterListArchived';
import ListActionsListItem from '../ListActionsListItem';
import ButtonUnobtrusive from '../ButtonUnobtrusive';
import type {
  UpdateListMutation,
  UpdateListMutationVariables,
} from '../../generated/graphql';

const ArchiveList = (): JSX.Element => {
  const boardListContext = useContext(BoardListContext);
  const dropdownContext = useContext(DropdownContext);
  const [updateList] = useMutation<
    UpdateListMutation,
    UpdateListMutationVariables
  >(UPDATE_LIST, {
    update: updateCacheAfterListArchived,
  });

  const archiveList = (): void => {
    if (!boardListContext || !dropdownContext) return;

    const { currList } = boardListContext;
    updateList({
      variables: {
        updateListId: currList.id,
        updates: {
          closed: true,
        },
      },
      optimisticResponse: {
        updateList: {
          ...currList,
        },
      },
    });

    dropdownContext.closeDropdownMenu();
  };

  return (
    <ListActionsListItem>
      <ButtonUnobtrusive onClick={archiveList}>
        Archive this list
      </ButtonUnobtrusive>
    </ListActionsListItem>
  );
};

export default ArchiveList;
