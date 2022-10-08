export interface SelectOption<T> {
  value: T;
  displayValue: T;
}

export interface SelectOptionGroups<T> {
  [key: string]: SelectOption<T>[];
}
