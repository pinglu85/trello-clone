import { useContext } from 'react';

import BoardCanvasContext from '../../contexts/BoardCanvasContext';
import BoardListContext from '../../contexts/BoardListContext';
import { SubmenuTrigger } from '../../common/MultiLevelMenu';
import MoveListMenu from './MoveListMenu';

const MoveList = (): JSX.Element | null => {
  const boardCanvasContext = useContext(BoardCanvasContext);
  const boardListContext = useContext(BoardListContext);
  if (!boardListContext || !boardCanvasContext) return null;

  const { currBoard, boards, reorderListsInCurrBoard } = boardCanvasContext;
  const { currList, currListIndex } = boardListContext;

  return (
    <SubmenuTrigger
      submenuTitle="Move list"
      submenuContent={
        <MoveListMenu
          currBoard={currBoard}
          currListId={currList.id}
          currListIndex={currListIndex}
          reorderListsInCurrBoard={reorderListsInCurrBoard}
          boards={boards}
        />
      }
    >
      Move list
    </SubmenuTrigger>
  );
};

export default MoveList;
