import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
  Renderer2,
} from '@angular/core';
import { KeyboardNavItemDirective } from './keyboard-nav-item.directive';

//

@Directive({
  selector: '[appKeyboardNav]',
})
export class KeyboardNavDirective {
  constructor(private _renderer: Renderer2) {}

  /**
   * Keyboard nav items.
   */
  @ContentChildren(KeyboardNavItemDirective, { descendants: true })
  public items: QueryList<KeyboardNavItemDirective>;

  /**
   * Set focus to next/previous element.
   *
   * @param event Keyboard event.
   */
  @HostListener('keydown.ArrowRight', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  @HostListener('keydown.ArrowLeft', ['$event'])
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
    target.element.scrollIntoView({
      block: 'center',
    });
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
        if (current.dirIndex !== 0 && current.dirIndex % 2 !== 0) {
          target = items[active - step];
        }
        /*if (!current.favorite) {
        if (current.dirIndex < current.favLength * 2) {
          target = items[current.dirIndex / 2];
          target.element.focus();
        } else {
          target = items[current.favLength - 1];
          target.element.focus();
        }
      }*/
        break;
    }

    return target;
  }
}
