import {
  ContentChildren,
  Directive,
  HostListener,
  Input,
  OnChanges,
  QueryList,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { KeyboardNavItemDirective } from './keyboard-nav-item.directive';

//

@Directive({
  selector: '[appKeyboardNav]',
})
export class KeyboardNavDirective implements OnChanges {
  constructor(private _renderer: Renderer2) {}

  @Input() switchToFavoritesMenu: {
    favoritesMenu: boolean;
    index: number;
  };

  /**
   * Keyboard nav items.
   */
  @ContentChildren(KeyboardNavItemDirective, { descendants: true })
  public items: QueryList<KeyboardNavItemDirective>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.switchToFavoritesMenu) {
      // console.log('LOL', changes.switchToFavoritesMenu);
      const response: {
        favoritesMenu: boolean;
        index: number;
      } = {
        index:
          changes.switchToFavoritesMenu.currentValue &&
          changes.switchToFavoritesMenu.currentValue.index,
        favoritesMenu:
          changes.switchToFavoritesMenu.currentValue &&
          changes.switchToFavoritesMenu.currentValue.favoritesMenu,
      };
      if (changes.switchToFavoritesMenu.currentValue) {
        this.getToFavoritesMenu(response);
      }
    }
  }

  private getToFavoritesMenu({ favoritesMenu, index }) {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];
    const _index = items.findIndex(item => item.isVisibleInView === true);
    console.log(index);
    const target = items && items[_index + index];
    if (target) {
      target.element.focus();
    }
  }
  /**
   * Set focus to next/previous element.
   *
   * @param event Keyboard event.
   */
  @HostListener('keydown.ArrowRight', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  @HostListener('keydown.ArrowLeft', ['$event'])
  @HostListener('keydown.ArrowUp', ['$event'])
  private nav(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.items.length) {
      return;
    }

    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];

    let active: number = 0;
    let i: number = this.items.length;
    while (i--) {
      if (items[i].element === document.activeElement) {
        active = i;
        break;
      }
    }

    if (active === undefined) {
      items[0].element.focus();
      return;
    }

    const target = this.getTargetElement(event, {
      active,
      items,
    });

    target.element.focus();
    if (event.code === 'ArrowDown') {
      target.element.scrollIntoView({
        block: 'center',
      });
    }
  }

  private getTargetElement(
    event: KeyboardEvent,
    element: {
      active: number;
      items: KeyboardNavItemDirective[];
    },
  ) {
    const { items, active } = element;
    const current: KeyboardNavItemDirective = items[active];
    let step: number = 1;

    let target = current;
    switch (event.code) {
      case 'ArrowDown':
        if (current.favorite) {
          if (!current.isLast) {
            target = items[active + step];
          }
        } else {
          step = 2;
          target = items[active + step];
        }
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
          console.log(index / 2, current.dirIndex / 2, items[index].element);
          target.favoritesMenu(numberOfElementsToSkip);
        }
        break;
      case 'ArrowUp':
        if (current.favorite) {
          target = items[active - step];
        } else {
          step = 2;
          if (current.dirIndex !== 0 && current.dirIndex !== 1) {
            target = items[active - step];
          }
        }
        break;
    }

    return target;
  }
}
