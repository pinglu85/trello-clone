import type { Rect } from '../../sharedTypes';

// https://silentmatt.com/rectangle-intersection/
function intersect<T extends Rect>(element1: T, element2: T): boolean {
  return (
    element1.left < element2.right &&
    element1.top < element2.bottom &&
    element1.right > element2.left &&
    element1.bottom > element2.top
  );
}

export default intersect;
