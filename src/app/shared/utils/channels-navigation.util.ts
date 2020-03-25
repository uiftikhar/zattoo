import { KeyboardNavItemDirective } from '../directive/keyboard-nav-item.directive';

export const channelsNavigation = (
  event: KeyboardEvent,
  element: {
    active: number;
    items: KeyboardNavItemDirective[];
    current: KeyboardNavItemDirective;
  },
): KeyboardNavItemDirective => {
  const { items, active, current } = element;
  let target: KeyboardNavItemDirective = current;
  let step: number = 1;

  switch (event.code) {
    case 'ArrowDown':
      step = 2;
      target = items[active + step];
      break;
    case 'ArrowRight':
      if (current.dirIndex % 2 === 0) {
        target = items[active + step];
      }
      break;

    case 'ArrowLeft':
      if (current.dirIndex % 2 !== 0) {
        target = items[active - step];
      } else if (current.dirIndex % 2 === 0 && !current.favorite) {
        const index = items.findIndex(item => item.isVisibleInView);
        const numberOfElementsToSkip = current.dirIndex / 2 - index / 2;
        target.favoritesMenu(numberOfElementsToSkip);
      }
      break;

    case 'ArrowUp':
      step = 2;
      if (current.dirIndex !== 0 && current.dirIndex !== 1) {
        target = items[active - step];
      }
      break;
  }

  return target;
};
