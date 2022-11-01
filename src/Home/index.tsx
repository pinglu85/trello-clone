import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

import GET_BOARDS from './query';
import styles from './styles.module.css';
import type {
  GetBoardsQuery,
  GetBoardsQueryVariables,
} from '../generated/graphql';

const Home = (): JSX.Element => {
  const { loading, error, data } = useQuery<
    GetBoardsQuery,
    GetBoardsQueryVariables
  >(GET_BOARDS, {
    variables: {
      closed: false,
    },
  });

  if (loading || !data) return <p>Loading...</p>;

  if (error) return <p>{error.message}</p>;

  return (
    <div className={styles.Home}>
      {data.boards.map(({ id, name }) => (
        <Link key={id} to={`/board/${id}`}>
          {name}
        </Link>
      ))}
    </div>
  );
};

export default Home;
