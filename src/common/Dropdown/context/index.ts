import { createContext } from 'react';

import type { IDropdownContext } from './types';

const DropdownContext = createContext<IDropdownContext | null>(null);

export default DropdownContext;
