import { useEffect } from 'react';

import type { IDropdownContext } from '../context/types';

const useAutoClose = (
  dropdownMenuRef: React.RefObject<HTMLDivElement>,
  dropdownContext: IDropdownContext | null
): void => {
  useEffect(() => {
    if (!dropdownContext) return;

    const { dropdownMenuToggleRef, closeDropdownMenu } = dropdownContext;
    if (!dropdownMenuToggleRef.current) return;

    const dropdownMenuToggle = dropdownMenuToggleRef.current;

    const handleClickOutsideDropdownMenu = (e: MouseEvent): void => {
      if (!dropdownMenuRef.current || !(e.target instanceof Element)) return;

      const dropdownMenu = dropdownMenuRef.current;

      if (
        !dropdownMenu.contains(e.target) &&
        !dropdownMenuToggle.contains(e.target)
      ) {
        closeDropdownMenu();
      }
    };
    document.body.addEventListener('mousedown', handleClickOutsideDropdownMenu);

    const closeDropdownMenuOnEscapePress = (e: KeyboardEvent): void => {
      if (e.code === 'Escape') {
        closeDropdownMenu();
        dropdownMenuToggle.blur();
      }
    };
    document.body.addEventListener('keydown', closeDropdownMenuOnEscapePress);

    return () => {
      document.body.removeEventListener(
        'mousedown',
        handleClickOutsideDropdownMenu
      );

      document.body.removeEventListener(
        'keydown',
        closeDropdownMenuOnEscapePress
      );
    };
  }, [dropdownContext, dropdownMenuRef]);
};

export default useAutoClose;
