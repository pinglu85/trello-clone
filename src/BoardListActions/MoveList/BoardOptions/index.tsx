import type { BoardWithoutLists } from '../../../shared/types';

interface BoardOptionsProps {
  boards: BoardWithoutLists[];
  currBoardId: string;
}

const BoardOptions = ({
  boards,
  currBoardId,
}: BoardOptionsProps): JSX.Element => {
  return (
    <>
      {boards.map(({ id, name }) => (
        <option key={id} value={id}>
          {`${name}${id === currBoardId ? ' (current)' : ''}`}
        </option>
      ))}
    </>
  );
};

export default BoardOptions;
