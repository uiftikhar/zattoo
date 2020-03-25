import { KeyboardNavItemDirective } from '../directive/keyboard-nav-item.directive';

export const favoriteNavigation = (
  event: KeyboardEvent,
  element: {
    active: number;
    items: KeyboardNavItemDirective[];
    current: KeyboardNavItemDirective;
  },
): KeyboardNavItemDirective => {
  const { items, active, current } = element;
  let target: KeyboardNavItemDirective = current;
  switch (event.code) {
    case 'ArrowDown':
      if (!current.isLast) {
        target = items[active + 1];
      }
      break;
    case 'ArrowRight':
      const index = items.findIndex(item => item.isVisibleInView);
      const numberOfElementsToSkip = current.dirIndex - index;
      target.channelsMenu(numberOfElementsToSkip);
      break;
    case 'ArrowUp':
      if (current.dirIndex !== 0) {
        target = items[active - 1];
      }
      break;
  }
  return target;
};
