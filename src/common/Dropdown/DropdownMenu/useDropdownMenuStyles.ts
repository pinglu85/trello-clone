import { useEffect } from 'react';

import type { IDropdownContext } from '../context/types';

const useDropdownMenuStyles = (
  dropdownMenuRef: React.RefObject<HTMLDivElement>,
  fixedTop: boolean,
  dropdownContext: IDropdownContext | null
): void => {
  useEffect(() => {
    const setDropdownMenuStyles = (): void => {
      if (!dropdownMenuRef.current || !dropdownContext) return;

      const { dropdownMenuToggleRef } = dropdownContext;
      if (!dropdownMenuToggleRef.current) return;

      const dropdownMenu = dropdownMenuRef.current;
      const dropdownMenuRect = dropdownMenu.getBoundingClientRect();
      const dropdownMenuToggle = dropdownMenuToggleRef.current;
      const dropdownMenuToggleRect = dropdownMenuToggle.getBoundingClientRect();
      const documentClientWidth = document.documentElement.clientWidth;
      const documentClientHeight = document.documentElement.clientHeight;

      const MARGIN = 4;
      let left = dropdownMenuToggleRect.left;
      if (left + dropdownMenuRect.width > documentClientWidth) {
        left = documentClientWidth - dropdownMenuRect.width - MARGIN;
      }
      dropdownMenu.style.left = `${left}px`;

      let top = dropdownMenuToggleRect.bottom + MARGIN;
      let maxHeight = 0;
      if (top + dropdownMenuRect.height > documentClientHeight) {
        if (fixedTop) {
          maxHeight = documentClientHeight - top;
        } else {
          top = Math.max(documentClientHeight - dropdownMenuRect.height, 0);
          maxHeight = Math.min(
            documentClientHeight - top,
            dropdownMenuRect.height
          );
        }
      }
      dropdownMenu.style.top = `${top}px`;
      dropdownMenu.style.maxHeight = maxHeight === 0 ? '' : `${maxHeight}px`;
    };

    setDropdownMenuStyles();
    window.addEventListener('resize', setDropdownMenuStyles);

    return () => {
      window.removeEventListener('resize', setDropdownMenuStyles);
    };
  }, [dropdownContext, dropdownMenuRef, fixedTop]);
};

export default useDropdownMenuStyles;
