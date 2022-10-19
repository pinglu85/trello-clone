import styles from './styles.module.css';

interface FormGridProps<T> extends PropsWithChildren {
  label: string;
  inputId: string;
  displayValueOfSelectedValue: T;
}

const FormGrid = <T extends string | number>({
  label,
  inputId,
  displayValueOfSelectedValue,
  children,
}: FormGridProps<T>): JSX.Element => {
  return (
    <div className={styles.FormGrid}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{displayValueOfSelectedValue}</span>
      <label htmlFor={inputId} className={styles.hidden}>
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGrid;
