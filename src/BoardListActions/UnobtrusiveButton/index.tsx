import styles from './styles.module.css';

const UnobtrusiveButton = (
  props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
): JSX.Element => {
  return <button className={styles.UnobtrusiveButton} {...props}></button>;
};

export default UnobtrusiveButton;
