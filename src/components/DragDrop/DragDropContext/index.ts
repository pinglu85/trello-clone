import { createContext } from 'react';

import type { DragDropData } from '../sharedTypes';

const DragDropContext =
  createContext<React.MutableRefObject<DragDropData> | null>(null);

export default DragDropContext;
