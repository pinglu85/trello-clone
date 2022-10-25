import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import { nanoid } from 'nanoid';

import BoardListContext from '../../contexts/BoardListContext';
import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import { DropdownContext } from '../../common/Dropdown';
import COPY_LIST from './mutation';
import updateCacheAfterListCopied from './updateCacheAfterListCopied';
import calcItemRank from '../../utils/calcItemRank';
import { MenuContent } from '../../common/Menu';
import Textarea from '../../common/Textarea';
import FormSubmitButton from '../FormSubmitButton';
import styles from './styles.module.css';
import type {
  CopyListMutation,
  CopyListMutationVariables,
  List,
} from '../../generated/graphql';

const CopyList = (): JSX.Element | null => {
  const boardListContext = useContext(BoardListContext);
  if (!boardListContext) return null;

  const { currListIndex, currList } = boardListContext;

  return (
    <SubmenuTrigger
      submenuTitle="Copy list"
      submenuContent={
        <CopyListMenu currListIndex={currListIndex} currList={currList} />
      }
    >
      Copy list..
    </SubmenuTrigger>
  );
};

interface CopyListMenuProps {
  currListIndex: number;
  currList: List;
}

const CopyListMenu = ({
  currListIndex,
  currList,
}: CopyListMenuProps): JSX.Element => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const dropdownContext = useContext(DropdownContext);
  const [listName, setListName] = useState(currList.name);
  const [copyList] = useMutation<CopyListMutation, CopyListMutationVariables>(
    COPY_LIST,
    {
      update: updateCacheAfterListCopied,
    }
  );

  const onListNameChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setListName(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (!boardCanvasContext || !dropdownContext) return;

    e.preventDefault();

    const { lists } = boardCanvasContext;
    const currList = lists[currListIndex];
    const newListRank = calcItemRank(currList, lists[currListIndex + 1]);
    const newListTempId = nanoid();

    copyList({
      variables: {
        sourceListId: currList.id,
        newListName: listName,
        newListRank,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        copyList: {
          ...currList,
          id: newListTempId,
          name: listName,
          rank: newListRank,
          cards: currList.cards.map((card) => ({
            ...card,
            id: nanoid(),
            listId: newListTempId,
          })),
        },
      },
    });

    dropdownContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <form onSubmit={onSubmit}>
        <label className={styles.label} htmlFor="list-name">
          Name
        </label>

        <Textarea
          id="list-name"
          className={styles.textarea}
          value={listName}
          onChange={onListNameChange}
        />

        <FormSubmitButton>Create list</FormSubmitButton>
      </form>
    </MenuContent>
  );
};

export default CopyList;
