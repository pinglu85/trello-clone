import { useContext } from 'react';

import MultiLevelMenuContext from '../context';
import ChevronLeftIcon from './chevron-left.svg';
import styles from './styles.module.css';
import type { PrevMenu } from '../context/types';

interface BackButtonProps {
  className: string;
}

const BackButton = ({ className }: BackButtonProps): JSX.Element => {
  const menuContext = useContext(MultiLevelMenuContext);

  const goBackToPrevMenu = (): void => {
    if (!menuContext) return;

    const { prevMenus, setPrevMenus, setCurrMenuTitle, setCurrMenuContent } =
      menuContext;

    if (prevMenus.length > 0) {
      const { menuTitle, menuContent } = prevMenus[
        prevMenus.length - 1
      ] as PrevMenu;
      setPrevMenus(prevMenus.slice(0, -1));
      setCurrMenuTitle(menuTitle);
      setCurrMenuContent(menuContent);
    }
  };

  return (
    <button className={className} onClick={goBackToPrevMenu}>
      <ChevronLeftIcon className={styles.icon} />
    </button>
  );
};

export default BackButton;
