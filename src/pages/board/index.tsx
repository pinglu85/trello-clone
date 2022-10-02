import ErrorComponent from 'next/error';
import type { GetServerSideProps, NextPage } from 'next';
import type { ApolloQueryResult } from '@apollo/client';

import Head from '../../components/common/Head';
import Board from '../../components/Board';
import apolloClient from '../../common/apolloClient';
import GET_BOARD from '../../components/Board/query';
import handleQueryError from '../../utils/handleQueryError';

interface BoardPageProps {
  board: BoardWithListsAndCards | null;
  errorMessage: string | null;
  statusCode: number | null;
}

const BoardPage: NextPage<BoardPageProps> = ({
  board,
  errorMessage,
  statusCode,
}) => {
  if (!board || board.closed) {
    return (
      <ErrorComponent
        statusCode={statusCode as number}
        title={errorMessage as string}
      />
    );
  }

  return (
    <>
      <Head title="Board" />
      <Board board={board} />
    </>
  );
};

interface GetBoardsData {
  board: BoardWithListsAndCards;
}

export const getServerSideProps: GetServerSideProps<
  BoardPageProps
> = async () => {
  try {
    const { data }: ApolloQueryResult<GetBoardsData> = await apolloClient.query(
      {
        query: GET_BOARD,
        variables: {
          boardId: '16',
        },
      }
    );

    return {
      props: {
        board: data.board,
        errorMessage: null,
        statusCode: null,
      },
    };
  } catch (error) {
    const { errorMessage, statusCode } = handleQueryError(error);

    return {
      props: {
        board: null,
        errorMessage,
        statusCode,
      },
    };
  }
};

export default BoardPage;
