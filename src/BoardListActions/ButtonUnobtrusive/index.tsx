import styles from './styles.module.css';

const ButtonUnobtrusive = (
  props: Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
): JSX.Element => {
  return <button className={styles.ButtonUnobtrusive} {...props}></button>;
};

export default ButtonUnobtrusive;
