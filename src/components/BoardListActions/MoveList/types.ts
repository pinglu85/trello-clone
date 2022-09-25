export interface SelectOption<T> {
  value: T;
  displayValue: T;
}

export interface SelectOptionGroups<T> {
  [index: string]: SelectOption<T>[];
}
