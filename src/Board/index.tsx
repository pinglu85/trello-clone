import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_BOARD from './query';
import Head from '../common/Head';
import BoardCanvas from '../BoardCanvas';
import BoardHeader from '../BoardHeader';
import styles from './styles.module.css';
import type { GetBoardQuery } from '../generated/graphql';

const Board = (): JSX.Element => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<GetBoardQuery>(GET_BOARD, {
    variables: {
      boardId: id,
    },
  });

  if (loading || !data) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <Head title="Board" />
      <div className={styles.Board}>
        <div className={styles.workspaceNavigation}></div>
        <div className={styles.boardContainer}>
          <BoardHeader />

          <BoardCanvas board={data.board} />
        </div>
      </div>
    </>
  );
};

export default Board;
