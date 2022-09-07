import type { GetServerSideProps, NextPage } from 'next';

import Head from '../../components/common/Head';
import Board from '../../components/Board';
import fakeBoardData from '../../components/Board/fakeBoardData';
import type { BoardProps } from '../../components/Board/types';

const BoardPage: NextPage<BoardProps> = ({ boardData }) => {
  return (
    <>
      <Head title="Board" />
      <Board boardData={boardData} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<BoardProps> = async () => {
  return {
    props: {
      boardData: fakeBoardData,
    },
  };
};

export default BoardPage;
