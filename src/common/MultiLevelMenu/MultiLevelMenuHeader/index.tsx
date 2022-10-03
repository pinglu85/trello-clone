import { useContext } from 'react';

import MultiLevelMenuContext from '../context';
import { MenuHeader } from '../../Menu';

interface MultiLevelMenuHeaderProps {
  className?: string;
  children: (currMenuTitle: string, showBackButton: boolean) => JSX.Element;
}

const MultiLevelMenuHeader = ({
  className,
  children,
}: MultiLevelMenuHeaderProps): JSX.Element | null => {
  const menuContext = useContext(MultiLevelMenuContext);
  if (!menuContext) return null;

  return (
    <MenuHeader className={className}>
      {children(
        menuContext.currMenuTitle ?? '',
        menuContext.prevMenus.length >= 1
      )}
    </MenuHeader>
  );
};

export default MultiLevelMenuHeader;
