import { useRef, useState } from 'react';

import DropdownContext from '../context';

const Dropdown = ({ children }: PropsWithChildren): JSX.Element => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownMenuToggleRef = useRef<HTMLButtonElement>(null);

  const toggleDropdownMenu = (): void => {
    setShowDropdownMenu(!showDropdownMenu);
  };

  const closeDropdownMenu = (): void => {
    setShowDropdownMenu(false);
  };

  return (
    <DropdownContext.Provider
      value={{
        showDropdownMenu,
        dropdownMenuToggleRef,
        toggleDropdownMenu,
        closeDropdownMenu,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};

export default Dropdown;
