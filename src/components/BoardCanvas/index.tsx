import { useState } from 'react';

import groupCardsByListId from './groupCardsByListId';
import styles from './styles.module.css';
import type { BoardCanvasProps } from './types';

const BoardCanvas = ({ boardData }: BoardCanvasProps): JSX.Element => {
  const [lists, setLists] = useState(boardData.lists);
  const [cards, setCards] = useState(groupCardsByListId(boardData));

  return <div className={styles.BoardCanvas}></div>;
};

export default BoardCanvas;
