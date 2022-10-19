import { createContext } from 'react';

import type { IDragDropContext } from '../types';

const DragDropContext =
  createContext<React.MutableRefObject<IDragDropContext> | null>(null);

export default DragDropContext;
