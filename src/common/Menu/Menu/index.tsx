import { forwardRef } from 'react';

import joinClassNames from '../../../utils/joinClassNames';
import styles from './styles.module.css';

interface MenuProps extends WithChildrenProps {
  className?: string;
}

type Ref = HTMLDivElement;

const Menu = forwardRef<Ref, MenuProps>(
  ({ className = '', children }, ref): JSX.Element => {
    return (
      <div ref={ref} className={joinClassNames(styles.Menu, className)}>
        {children}
      </div>
    );
  }
);
// If we don't set the `displayName` property on the `Menu` component,
// we will get an error of `Component definition is missing display name`
// from eslint.
Menu.displayName = 'Menu';

export default Menu;
