import { useContext, useRef } from 'react';

import useDropdownMenuStyles from './useDropdownMenuStyles';
import useAutoClose from './useAutoClose';
import DropdownContext from '../context';
import Menu from '../../Menu';
import MultiLevelMenu from '../../MultiLevelMenu';
import withPortal from '../../../hoc/withPortal';
import styles from './styles.module.css';
import type { MultiLevelMenuProps } from '../../MultiLevelMenu';

interface DropdownMenuProps extends PropsWithChildren {
  fixedTop?: boolean;
}

const DropdownMenu = ({
  fixedTop = false,
  children,
}: DropdownMenuProps): JSX.Element | null => {
  const dropdownContext = useContext(DropdownContext);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useDropdownMenuStyles(dropdownMenuRef, fixedTop, dropdownContext);
  useAutoClose(dropdownMenuRef, dropdownContext);

  if (!dropdownContext?.showDropdownMenu) return null;

  return (
    <Menu ref={dropdownMenuRef} className={styles.DropdownMenu}>
      {children}
    </Menu>
  );
};

type DropdownMenuMultiLevelProps = Omit<DropdownMenuProps, 'children'> &
  Omit<MultiLevelMenuProps, 'className' | 'menuRef'>;

const DropdownMenuMultiLevel = ({
  fixedTop = false,
  mainMenuTitle,
  menuHeader,
  mainMenuContent,
}: DropdownMenuMultiLevelProps): JSX.Element | null => {
  const dropdownContext = useContext(DropdownContext);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useDropdownMenuStyles(dropdownMenuRef, fixedTop, dropdownContext);
  useAutoClose(dropdownMenuRef, dropdownContext);

  if (!dropdownContext?.showDropdownMenu) return null;

  return (
    <MultiLevelMenu
      menuRef={dropdownMenuRef}
      className={styles.DropdownMenu}
      mainMenuTitle={mainMenuTitle}
      menuHeader={menuHeader}
      mainMenuContent={mainMenuContent}
    />
  );
};

const DROPDOWN_PORTAL_ID = 'dropdown-portal';

export const MultiLevelDropdownMenu = withPortal<DropdownMenuMultiLevelProps>(
  DROPDOWN_PORTAL_ID,
  DropdownMenuMultiLevel
);

export default withPortal<DropdownMenuProps>(DROPDOWN_PORTAL_ID, DropdownMenu);
