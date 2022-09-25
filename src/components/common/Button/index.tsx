import joinClassNames from '../../../utils/joinClassNames';
import styles from './styles.module.css';

const ButtonPrimary = ({
  className = '',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      className={joinClassNames(styles.ButtonPrimary, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { ButtonPrimary };
