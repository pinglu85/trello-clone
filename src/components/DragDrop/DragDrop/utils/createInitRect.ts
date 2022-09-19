import type { Rect } from '../../sharedTypes';

function createInitRect(): Rect {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  };
}

export default createInitRect;
