import type { ListWithoutCards } from '../../../shared/types';

interface PositionOptionsProps {
  lists: ListWithoutCards[];
  currListId: string;
}

const PositionOptions = ({
  lists,
  currListId,
}: PositionOptionsProps): JSX.Element => {
  return (
    <>
      {lists.map(({ id }, index) => (
        <option key={id} value={index}>
          {`${index + 1}${id === currListId ? ' (current)' : ''}`}
        </option>
      ))}
    </>
  );
};

export default PositionOptions;
