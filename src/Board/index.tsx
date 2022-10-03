import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_BOARD from './query';
import Head from '../common/Head';
import BoardCanvas from '../BoardCanvas';
import BoardHeader from '../BoardHeader';
import styles from './styles.module.css';

interface GetBoardsData {
  board: BoardWithListsAndCards;
}

const Board = (): JSX.Element => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_BOARD, {
    variables: {
      boardId: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { board } = data as GetBoardsData;

  return (
    <>
      <Head title="Board" />
      <div className={styles.Board}>
        <div className={styles.workspaceNavigation}></div>
        <div className={styles.boardContainer}>
          <BoardHeader />

          <BoardCanvas board={board} />
        </div>
      </div>
    </>
  );
};

export default Board;
