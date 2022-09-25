import { useContext, useState } from 'react';

import BoardListContext from '../../../contexts/BoardListContext';
import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import generatePositionOptions from './utils/generatePositionOptions';
import { DropdownContext } from '../../common/Dropdown';
import { MenuContent } from '../../common/Menu';
import FormGrid from './FormGrid';
import Select from './Select';
import { ButtonPrimary } from '../../common/Button';
import styles from './styles.module.css';

const MoveList = (): JSX.Element | null => {
  const boardListContext = useContext(BoardListContext);
  if (!boardListContext) return null;

  return (
    <SubmenuTrigger
      submenuTitle="Move list"
      submenuContent={<MoveListMenu {...boardListContext} />}
    >
      Move list
    </SubmenuTrigger>
  );
};

interface MoveListMenuProps {
  currListIdx: number;
  numOfLists: number;
  reorderLists: ReorderLists;
}

const MoveListMenu = ({
  currListIdx,
  numOfLists,
  reorderLists,
}: MoveListMenuProps): JSX.Element | null => {
  const dropdownMenuContext = useContext(DropdownContext);
  const [destinationIdx, setDestinationIdx] = useState(currListIdx);
  const positionOptions = generatePositionOptions(numOfLists);

  const onPositionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDestinationIdx(Number(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!dropdownMenuContext) return;

    if (destinationIdx < currListIdx) {
      reorderLists(currListIdx, destinationIdx);
    } else if (destinationIdx > currListIdx) {
      reorderLists(currListIdx, destinationIdx + 1);
    }

    dropdownMenuContext.closeDropdownMenu();
  };

  return (
    <MenuContent>
      <form onSubmit={onSubmit}>
        <FormGrid
          label="Position"
          inputId="position"
          displayValueOfSelectedValue={destinationIdx + 1}
        >
          <Select
            selectId="position"
            selectedValue={destinationIdx}
            options={positionOptions}
            currValue={currListIdx}
            onChange={onPositionChange}
          />
        </FormGrid>
        <ButtonPrimary type="submit" className={styles.submitButton}>
          Move
        </ButtonPrimary>
      </form>
    </MenuContent>
  );
};

export default MoveList;
