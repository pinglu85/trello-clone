import { useState } from 'react';

import Menu from '../../Menu';
import MultiLevelMenuContext from '../context';
import type { MultiLevelMenuProps } from './types';
import type { PrevMenu } from '../context/types';

const MultiLevelMenu = ({
  menuRef,
  className,
  mainMenuTitle,
  menuHeader,
  mainMenuContent,
}: MultiLevelMenuProps): JSX.Element => {
  const [currMenuTitle, setCurrMenuTitle] = useState(mainMenuTitle);
  const [currMenuContent, setCurrMenuContent] = useState(mainMenuContent);
  const [prevMenus, setPrevMenus] = useState<PrevMenu[]>([]);

  return (
    <MultiLevelMenuContext.Provider
      value={{
        currMenuTitle,
        setCurrMenuTitle,
        currMenuContent,
        setCurrMenuContent,
        prevMenus,
        setPrevMenus,
      }}
    >
      <Menu ref={menuRef} className={className}>
        {menuHeader}

        {currMenuContent}
      </Menu>
    </MultiLevelMenuContext.Provider>
  );
};

export default MultiLevelMenu;
