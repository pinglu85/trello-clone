import { useContext } from 'react';
import { useMutation } from '@apollo/client';

import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import { DropdownContext } from '../../common/Dropdown';
import BoardListContext from '../../contexts/BoardListContext';
import ARCHIVE_ALL_CARDS from './mutation';
import updateCacheAfterCardsArchived from './updateCacheAfterCardsArchived';
import { MenuContent } from '../../common/Menu';
import { FormSubmitButtonDanger } from '../FormSubmitButton';
import type {
  ArchiveAllCardsMutation,
  ArchiveAllCardsMutationVariables,
} from '../../generated/graphql';

const ArchiveAllCards = (): JSX.Element => {
  return (
    <SubmenuTrigger
      submenuTitle="Archive all cards in this list?"
      submenuContent={<ArchiveAllCardsMenu />}
    >
      Archive all cards in this list…
    </SubmenuTrigger>
  );
};

const ArchiveAllCardsMenu = (): JSX.Element => {
  const dropdownContext = useContext(DropdownContext);
  const boardListContext = useContext(BoardListContext);
  const [archiveAllCards] = useMutation<
    ArchiveAllCardsMutation,
    ArchiveAllCardsMutationVariables
  >(ARCHIVE_ALL_CARDS, {
    update: updateCacheAfterCardsArchived,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!dropdownContext || !boardListContext) return;

    const { currList } = boardListContext;

    if (currList.cards.length > 0) {
      archiveAllCards({
        variables: { listId: currList.id },
        optimisticResponse: {
          __typename: 'Mutation',
          archiveAllCards: currList.cards.map((card) => ({
            ...card,
            closed: true,
          })),
        },
      });
    }

    dropdownContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <form onSubmit={onSubmit}>
        <p>
          This will remove all the cards in this list from the board. To view
          archived cards and bring them back to the board, click “Menu” &gt;
          “Archived Items.”
        </p>

        <FormSubmitButtonDanger>Archive all</FormSubmitButtonDanger>
      </form>
    </MenuContent>
  );
};

export default ArchiveAllCards;
