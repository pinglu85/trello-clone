import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import GET_BOARDS_AND_BOARD from './query';
import Head from '../common/Head';
import BoardCanvas from '../BoardCanvas';
import BoardHeader from '../BoardHeader';
import styles from './styles.module.css';
import type {
  GetBoardsAndBoardQuery,
  GetBoardsAndBoardQueryVariables,
} from '../generated/graphql';

const Board = (): JSX.Element => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<
    GetBoardsAndBoardQuery,
    GetBoardsAndBoardQueryVariables
  >(GET_BOARDS_AND_BOARD, {
    variables: {
      closed: false,
      boardId: id ?? '',
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

          <BoardCanvas currBoard={data.board} boards={data.boards} />
        </div>
      </div>
    </>
  );
};

export default Board;
