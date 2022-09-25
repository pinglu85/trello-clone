import { useEffect } from 'react';

import type { IDropdownContext } from '../context/types';

const useAutoClose = (
  dropdownMenuRef: React.RefObject<HTMLDivElement>,
  dropdownContext: IDropdownContext | null
): void => {
  useEffect(() => {
    const handleClickOutsideDropdownMenu = (e: MouseEvent): void => {
      if (
        !dropdownMenuRef.current ||
        !dropdownContext ||
        !(e.target instanceof Element)
      ) {
        return;
      }

      const { dropdownMenuToggleRef, closeDropdownMenu } = dropdownContext;
      if (!dropdownMenuToggleRef.current) return;

      const dropdownMenu = dropdownMenuRef.current;
      const dropdownMenuToggle = dropdownMenuToggleRef.current;
      if (
        !dropdownMenu.contains(e.target) &&
        !dropdownMenuToggle.contains(e.target)
      ) {
        closeDropdownMenu();
      }
    };

    document.body.addEventListener('mousedown', handleClickOutsideDropdownMenu);

    return () => {
      document.body.removeEventListener(
        'mousedown',
        handleClickOutsideDropdownMenu
      );
    };
  }, [dropdownContext, dropdownMenuRef]);
};

export default useAutoClose;
