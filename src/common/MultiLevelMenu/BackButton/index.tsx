import { useContext } from 'react';

import MultiLevelMenuContext from '../context';
import { ReactComponent as ChevronLeftIcon } from './chevron-left.svg';
import styles from './styles.module.css';

interface BackButtonProps {
  className: string;
}

const BackButton = ({ className }: BackButtonProps): JSX.Element => {
  const menuContext = useContext(MultiLevelMenuContext);

  const onClick = (): void => {
    if (!menuContext) return;

    const { prevMenus, goBackToPrevMenu } = menuContext;
    if (prevMenus.length > 0) goBackToPrevMenu();
  };

  return (
    <button className={className} onClick={onClick}>
      <ChevronLeftIcon className={styles.icon} />
    </button>
  );
};

export default BackButton;
