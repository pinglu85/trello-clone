import { createContext } from 'react';

import type { IMultiLevelMenuContext } from './types';

const MultiLevelMenuContext = createContext<IMultiLevelMenuContext | null>(
  null
);

export default MultiLevelMenuContext;
