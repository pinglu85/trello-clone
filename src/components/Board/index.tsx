import BoardCanvas from '../BoardCanvas';
import BoardHeader from '../BoardHeader';
import styles from './styles.module.css';
import type { BoardProps } from './types';

const Board = ({ board }: BoardProps): JSX.Element => {
  return (
    <div className={styles.Board}>
      <div className={styles.workspaceNavigation}></div>
      <div className={styles.boardContainer}>
        <BoardHeader />
        <BoardCanvas board={board} />
      </div>
    </div>
  );
};

export default Board;
