import BoardCanvas from '../BoardCanvas';
import BoardHeader from '../BoardHeader';
import styles from './styles.module.css';
import type { BoardProps } from './types';

const Board = ({ boardData }: BoardProps): JSX.Element => {
  return (
    <div className={styles.Board}>
      <div className={styles.workspaceNavigation}></div>
      <div className={styles.boardContainer}>
        <BoardHeader />
        <BoardCanvas boardData={boardData} />
      </div>
    </div>
  );
};

export default Board;
