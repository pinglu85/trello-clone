import { useContext } from 'react';

import MultiLevelMenuContext from '../context';
import joinClassNames from '../../../utils/joinClassNames';
import styles from './styles.module.css';

interface SubmenuTriggerProps extends PropsWithChildren {
  className?: string;
  submenuTitle: string;
  submenuContent: React.ReactNode;
}

const SubmenuTrigger = ({
  className = '',
  submenuTitle,
  submenuContent,
  children,
}: SubmenuTriggerProps): JSX.Element => {
  const menuContext = useContext(MultiLevelMenuContext);

  const showSubmenu = (): void => {
    if (!menuContext) return;

    const {
      currMenuTitle,
      currMenuContent,
      setCurrMenuTitle,
      setCurrMenuContent,
      prevMenus,
      setPrevMenus,
    } = menuContext;

    setPrevMenus([
      ...prevMenus,
      { menuTitle: currMenuTitle, menuContent: currMenuContent },
    ]);
    setCurrMenuTitle(submenuTitle);
    setCurrMenuContent(submenuContent);
  };

  return (
    <button
      className={joinClassNames(styles.SubmenuTrigger, className)}
      onClick={showSubmenu}
    >
      {children}
    </button>
  );
};

export default SubmenuTrigger;
