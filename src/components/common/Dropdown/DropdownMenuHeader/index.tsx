import { useContext } from 'react';

import { MenuHeader, CloseButton } from '../../Menu';
import { BackButton, MultiLevelMenuHeader } from '../../MultiLevelMenu';
import DropdownContext from '../context';
import styles from './styles.module.css';

interface DropdownMenuHeaderProps {
  menuTitle: string;
}

const DropdownMenuHeader = ({
  menuTitle,
}: DropdownMenuHeaderProps): JSX.Element => {
  return (
    <MenuHeader className={styles.DropdownMenuHeader}>
      <MenuTitle menuTitle={menuTitle} />
      <MenuCloseButton />
    </MenuHeader>
  );
};

const MultiLevelDropdownMenuHeader = (): JSX.Element => {
  return (
    <MultiLevelMenuHeader className={styles.DropdownMenuHeader}>
      {(currMenuTitle, showBackButton): JSX.Element => (
        <>
          {showBackButton && <BackButton className={styles.backButton} />}
          <MenuTitle menuTitle={currMenuTitle} />
          <MenuCloseButton />
        </>
      )}
    </MultiLevelMenuHeader>
  );
};

const MenuTitle = ({ menuTitle }: DropdownMenuHeaderProps): JSX.Element => {
  return <span className={styles.MenuTitle}>{menuTitle}</span>;
};

const MenuCloseButton = (): JSX.Element | null => {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) return null;

  return (
    <CloseButton
      className={styles.MenuCloseButton}
      onClick={dropdownContext.closeDropdownMenu}
    />
  );
};

export { MultiLevelDropdownMenuHeader };

export default DropdownMenuHeader;
