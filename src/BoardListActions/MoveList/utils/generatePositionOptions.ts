import type { SelectOption } from '../types';

function generatePositionOptions(numOfLists: number): SelectOption<number>[] {
  return Array.from({ length: numOfLists }, (_, idx) => ({
    value: idx,
    displayValue: idx + 1,
  }));
}

export default generatePositionOptions;
