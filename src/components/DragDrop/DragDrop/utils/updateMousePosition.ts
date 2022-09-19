import type { MousePosition } from '../types';

function updateMousePosition(
  e: MouseEvent,
  mousePosition: MousePosition
): void {
  for (const key of Object.keys(mousePosition) as (keyof MousePosition)[]) {
    mousePosition[key] = e[key];
  }
}

export default updateMousePosition;
