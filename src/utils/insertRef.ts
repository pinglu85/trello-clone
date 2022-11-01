import type { Reference } from '@apollo/client';

function insertRef(
  refs: Reference[],
  ref: Reference,
  insertPosition: number
): Reference[] {
  const newRefs: Reference[] = [];

  for (let i = 0; i < refs.length; i++) {
    if (i === insertPosition) newRefs.push(ref);

    newRefs.push(refs[i]);
  }

  if (insertPosition === refs.length) newRefs.push(ref);

  return newRefs;
}

export default insertRef;
