export interface MultiLevelMenuProps {
  menuRef?: React.RefObject<HTMLDivElement>;
  className?: string;
  mainMenuTitle: string;
  menuHeader: React.ReactNode;
  mainMenuContent: React.ReactNode;
}
