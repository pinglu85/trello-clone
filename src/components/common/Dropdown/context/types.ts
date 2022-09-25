export interface IDropdownContext {
  showDropdownMenu: boolean;
  dropdownMenuToggleRef: React.RefObject<HTMLButtonElement>;
  toggleDropdownMenu: () => void;
  closeDropdownMenu: () => void;
}
