import { useContext, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { DropdownContext } from '../../../common/Dropdown';
import GET_BOARD_LISTS from './query';
import { MOVE_LIST } from '../../../shared/mutation';
import updateCacheAfterListMoved from '../../../utils/updateCacheAfterListMoved';
import calcItemRank from '../../../utils/calcItemRank';
import { MenuContent } from '../../../common/Menu';
import FormGrid from '../FormGrid';
import Select from '../Select';
import BoardOptions from '../BoardOptions';
import PositionOptions from '../PositionOptions';
import FormSubmitButton from '../../FormSubmitButton';
import type {
  Board,
  GetBoardListsQuery,
  GetBoardListsQueryVariables,
  List,
  MoveListMutation,
  MoveListMutationVariables,
} from '../../../generated/graphql';
import type { BoardWithoutLists } from '../../../shared/types';

interface MoveListMenuProps {
  currBoard: Board;
  currList: List;
  currListIndex: number;
  reorderListsInCurrBoard: ReorderListsInCurrBoard;
  boards: BoardWithoutLists[];
}

type DestinationBoard = Pick<Board, 'id' | 'name'>;

const MoveListMenu = ({
  currBoard,
  currList,
  currListIndex,
  reorderListsInCurrBoard,
  boards,
}: MoveListMenuProps): JSX.Element | null => {
  const dropdownContext = useContext(DropdownContext);
  const [destinationBoard, setDestinationBoard] =
    useState<DestinationBoard>(currBoard);
  const [destinationIndex, setDestinationIndex] = useState(currListIndex);
  const [getBoardLists, { data }] = useLazyQuery<
    GetBoardListsQuery,
    GetBoardListsQueryVariables
  >(GET_BOARD_LISTS);
  const [moveList] = useMutation<MoveListMutation, MoveListMutationVariables>(
    MOVE_LIST,
    {
      update: updateCacheAfterListMoved,
    }
  );

  if (!dropdownContext) return null;

  const onBoardChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { options, selectedIndex } = e.target;
    const destinationBoardId = e.target.value;
    let destinationBoardName = currBoard.name;

    if (destinationBoardId === currBoard.id) {
      setDestinationIndex(currListIndex);
    } else {
      destinationBoardName = options[selectedIndex].text;
      setDestinationIndex(0);
      getBoardLists({
        variables: {
          boardId: destinationBoardId,
        },
      });
    }

    setDestinationBoard({
      id: destinationBoardId,
      name: destinationBoardName,
    });
  };

  const onPositionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDestinationIndex(Number(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (destinationBoard.id === currBoard.id) {
      if (destinationIndex < currListIndex) {
        reorderListsInCurrBoard(currListIndex, destinationIndex);
      } else if (destinationIndex > currListIndex) {
        reorderListsInCurrBoard(currListIndex, destinationIndex + 1);
      }
    } else if (data) {
      const { lists: listsInDestinationBoard } = data.board;
      const newRank = calcItemRank(
        listsInDestinationBoard[destinationIndex - 1],
        listsInDestinationBoard[destinationIndex]
      );

      moveList({
        variables: {
          moveListId: currList.id,
          sourceBoardId: currBoard.id,
          destinationBoardId: destinationBoard.id,
          newRank,
        },
        optimisticResponse: {
          __typename: 'Mutation',
          moveList: {
            ...currList,
            boardId: destinationBoard.id,
            rank: newRank,
          },
        },
      });
    }

    dropdownContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <form onSubmit={onSubmit}>
        <FormGrid
          label="Board"
          inputId="board"
          displayValueOfSelectedValue={destinationBoard.name}
        >
          <Select
            selectId="board"
            selectedValue={destinationBoard.id}
            onChange={onBoardChange}
          >
            <BoardOptions boards={boards} currBoardId={currBoard.id} />
          </Select>
        </FormGrid>

        <FormGrid
          label="Position"
          inputId="position"
          displayValueOfSelectedValue={destinationIndex + 1}
        >
          <Select
            selectId="position"
            selectedValue={destinationIndex}
            onChange={onPositionChange}
          >
            <PositionOptions
              lists={
                data && destinationBoard.id !== currBoard.id
                  ? data.board.lists
                  : currBoard.lists
              }
              currListId={currList.id}
            />
          </Select>
        </FormGrid>

        <FormSubmitButton>Move</FormSubmitButton>
      </form>
    </MenuContent>
  );
};

export default MoveListMenu;
