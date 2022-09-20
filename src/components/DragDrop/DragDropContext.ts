import { createContext } from 'react';

import type { DragDropData } from './types';

const DragDropContext =
  createContext<React.MutableRefObject<DragDropData> | null>(null);

export default DragDropContext;
