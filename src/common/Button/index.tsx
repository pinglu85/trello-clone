import joinClassNames from '../../utils/joinClassNames';
import styles from './styles.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonPrimary = ({
  className = '',
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={joinClassNames(styles.ButtonPrimary, className)}
      {...props}
    >
      {children}
    </button>
  );
};

const ButtonDanger = ({
  className = '',
  children,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={joinClassNames(styles.ButtonDanger, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export { ButtonPrimary, ButtonDanger };
