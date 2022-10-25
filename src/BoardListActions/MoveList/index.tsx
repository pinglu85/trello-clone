import { useContext, useState } from 'react';

import BoardListContext from '../../contexts/BoardListContext';
import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import generatePositionOptions from './utils/generatePositionOptions';
import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import { DropdownContext } from '../../common/Dropdown';
import { MenuContent } from '../../common/Menu';
import FormGrid from './FormGrid';
import Select from './Select';
import FormSubmitButton from '../FormSubmitButton';

const MoveList = (): JSX.Element | null => {
  const boardListContext = useContext(BoardListContext);
  if (!boardListContext) return null;

  return (
    <SubmenuTrigger
      submenuTitle="Move list"
      submenuContent={
        <MoveListMenu currListIndex={boardListContext.currListIndex} />
      }
    >
      Move list
    </SubmenuTrigger>
  );
};

interface MoveListMenuProps {
  currListIndex: number;
}

const MoveListMenu = ({
  currListIndex,
}: MoveListMenuProps): JSX.Element | null => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const dropdownContext = useContext(DropdownContext);
  const [destinationIndex, setDestinationIndex] = useState(currListIndex);

  if (!boardCanvasContext || !dropdownContext) return null;

  const { lists, reorderLists } = boardCanvasContext;
  const positionOptions = generatePositionOptions(lists.length);

  const onPositionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDestinationIndex(Number(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (destinationIndex < currListIndex) {
      reorderLists(currListIndex, destinationIndex);
    } else if (destinationIndex > currListIndex) {
      reorderLists(currListIndex, destinationIndex + 1);
    }

    dropdownContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <form onSubmit={onSubmit}>
        <FormGrid
          label="Position"
          inputId="position"
          displayValueOfSelectedValue={destinationIndex + 1}
        >
          <Select
            selectId="position"
            selectedValue={destinationIndex}
            options={positionOptions}
            currValue={currListIndex}
            onChange={onPositionChange}
          />
        </FormGrid>

        <FormSubmitButton>Move</FormSubmitButton>
      </form>
    </MenuContent>
  );
};

export default MoveList;
