import type { Reference } from '@apollo/client';
import type { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

function findOrderableRefInsertPosition(
  sortedRefs: Reference[],
  targetRank: string,
  readField: ReadFieldFunction
): number {
  let left = 0;
  let right = sortedRefs.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    const rank = readField('rank', sortedRefs[mid]) as string;

    if (rank > targetRank) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

export default findOrderableRefInsertPosition;
