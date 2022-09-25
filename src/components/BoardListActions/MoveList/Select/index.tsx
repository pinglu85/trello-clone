import styles from './styles.module.css';
import type { SelectOption, SelectOptionGroups } from '../types';

interface SelectProps<T> {
  selectId: string;
  selectedValue: T;
  options: SelectOption<T>[];
  currValue: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = <T extends number | string>({
  selectId,
  selectedValue,
  options,
  currValue,
  onChange,
}: SelectProps<T>): JSX.Element => {
  return (
    <select
      id={selectId}
      className={styles.Select}
      value={selectedValue}
      onChange={onChange}
    >
      {options.map(({ displayValue, value }) => (
        <option key={displayValue} value={value}>
          {`${displayValue}${value === currValue ? ' (current)' : ''}`}
        </option>
      ))}
    </select>
  );
};

interface SelectWithOptionGroupProps<T> {
  selectId: string;
  selectedValue: T;
  optionGroupNames: string[];
  options: SelectOptionGroups<T>;
  currValue: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectWithOptionGroup = <T extends string | number>({
  selectId,
  selectedValue,
  optionGroupNames,
  options,
  currValue,
  onChange,
}: SelectWithOptionGroupProps<T>): JSX.Element => {
  return (
    <select
      id={selectId}
      className={styles.select}
      value={selectedValue}
      onChange={onChange}
    >
      {optionGroupNames.map((groupName) => (
        <optgroup key={groupName} label={groupName}>
          {options[groupName].map(({ displayValue, value }) => (
            <option key={displayValue} value={value}>
              {`${displayValue}${value === currValue ? ' (current)' : ''}`}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export { SelectWithOptionGroup };

export default Select;
