import { useContext } from 'react';

import DropdownContext from '../context';

interface DropdownMenuToggleProps extends WithChildrenProps {
  className: string;
}

const DropdownMenuToggle = ({
  className,
  children,
}: DropdownMenuToggleProps): JSX.Element | null => {
  const dropdownContext = useContext(DropdownContext);
  if (!dropdownContext) return null;

  const { dropdownMenuToggleRef, toggleDropdownMenu } = dropdownContext;
  return (
    <button
      ref={dropdownMenuToggleRef}
      className={className}
      onClick={toggleDropdownMenu}
    >
      {children}
    </button>
  );
};

export default DropdownMenuToggle;
