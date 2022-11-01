import type { Reference } from '@apollo/client';
import type { ReadFieldFunction } from '@apollo/client/cache/core/types/common';

function removeRef(
  refs: Reference[],
  targetId: string,
  readField: ReadFieldFunction
): [newRefs: Reference[], removedListRef: Reference | null] {
  const newRefs: Reference[] = [];
  let removedListRef: Reference | null = null;

  for (const ref of refs) {
    const refId = readField('id', ref);

    if (refId === targetId) {
      removedListRef = ref;
    } else {
      newRefs.push(ref);
    }
  }

  return [newRefs, removedListRef];
}

export default removeRef;
