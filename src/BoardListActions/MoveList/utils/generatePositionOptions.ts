import type { SelectOption } from '../types';

function generatePositionOptions(numOfLists: number): SelectOption<number>[] {
  return Array.from({ length: numOfLists }, (_, index) => ({
    value: index,
    displayValue: index + 1,
  }));
}

export default generatePositionOptions;
