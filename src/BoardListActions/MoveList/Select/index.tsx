import styles from './styles.module.css';
interface SelectProps<T> extends PropsWithChildren {
  selectId: string;
  selectedValue: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = <T extends number | string>({
  selectId,
  selectedValue,
  onChange,
  children,
}: SelectProps<T>): JSX.Element => {
  return (
    <select
      id={selectId}
      className={styles.Select}
      value={selectedValue}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default Select;
