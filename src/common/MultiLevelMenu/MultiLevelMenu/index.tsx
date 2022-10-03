import { useCallback, useEffect, useState } from 'react';

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

  const goBackToPrevMenu = useCallback((): void => {
    const { menuTitle, menuContent } = prevMenus[
      prevMenus.length - 1
    ] as PrevMenu;
    setPrevMenus(prevMenus.slice(0, -1));
    setCurrMenuTitle(menuTitle);
    setCurrMenuContent(menuContent);
  }, [prevMenus]);

  useEffect(() => {
    const goBackToPrevMenuOnEscapePress = (e: KeyboardEvent): void => {
      if (e.code !== 'Escape') return;

      if (prevMenus.length > 0) {
        e.stopPropagation();
        goBackToPrevMenu();
      }
    };

    document.body.addEventListener('keydown', goBackToPrevMenuOnEscapePress);

    return () => {
      document.body.removeEventListener(
        'keydown',
        goBackToPrevMenuOnEscapePress
      );
    };
  }, [prevMenus, goBackToPrevMenu]);

  return (
    <MultiLevelMenuContext.Provider
      value={{
        currMenuTitle,
        setCurrMenuTitle,
        currMenuContent,
        setCurrMenuContent,
        prevMenus,
        setPrevMenus,
        goBackToPrevMenu,
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
