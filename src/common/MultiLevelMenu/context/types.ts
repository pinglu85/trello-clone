export interface PrevMenu {
  menuTitle: string;
  menuContent: React.ReactNode;
}

export interface IMultiLevelMenuContext {
  currMenuTitle: string;
  setCurrMenuTitle: React.Dispatch<string>;
  currMenuContent: React.ReactNode;
  setCurrMenuContent: React.Dispatch<React.ReactNode>;
  prevMenus: PrevMenu[];
  setPrevMenus: React.Dispatch<PrevMenu[]>;
  goBackToPrevMenu: () => void;
}
