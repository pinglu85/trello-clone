import { useContext, useState } from 'react';

import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import generatePositionOptions from './utils/generatePositionOptions';
import BoardCanvasContext from '../../../contexts/BoardCanvasContext';
import { DropdownContext } from '../../common/Dropdown';
import { MenuContent } from '../../common/Menu';
import FormGrid from './FormGrid';
import Select from './Select';
import { ButtonPrimary } from '../../common/Button';
import styles from './styles.module.css';

interface MoveListProps {
  currListIdx: number;
}

const MoveList = ({ currListIdx }: MoveListProps): JSX.Element | null => {
  return (
    <SubmenuTrigger
      submenuTitle="Move list"
      submenuContent={<MoveListMenu currListIdx={currListIdx} />}
    >
      Move list
    </SubmenuTrigger>
  );
};

const MoveListMenu = ({ currListIdx }: MoveListProps): JSX.Element | null => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const dropdownMenuContext = useContext(DropdownContext);
  const [destinationIdx, setDestinationIdx] = useState(currListIdx);

  if (!boardCanvasContext || !dropdownMenuContext) return null;

  const { lists, reorderLists } = boardCanvasContext;
  const positionOptions = generatePositionOptions(lists.length);

  const onPositionChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setDestinationIdx(Number(e.target.value));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

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
