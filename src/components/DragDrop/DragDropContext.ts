import { createContext } from 'react';

import type { DragDropContextInterface } from './types';

const DragDropContext = createContext(<DragDropContextInterface>{});

export default DragDropContext;
