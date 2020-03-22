import {
  ContentChildren,
  Directive,
  HostListener,
  QueryList,
} from '@angular/core';
import { KeyboardNavItemDirective } from './keyboard-nav-item.directive';

//

@Directive({
  selector: '[appKeyboardNav]',
})
export class KeyboardNavDirective {
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
  // @HostListener('keydown.ArrowUp', ['$event'])
  // @HostListener('keydown.ArrowUp', ['$event'])
  @HostListener('keydown.ArrowDown', ['$event'])
  // @HostListener('keydown.ArrowLeft', ['$event'])
  private nav(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.items.length) {
      return;
    }

    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];

    let step: number = 0;
    switch (event.code) {
      case 'ArrowDown':
        step = 1;
        break;
      case 'ArrowUp':
        step = -1;
        break;
      case 'ArrowRight':
        step = 10;
        break;
      case 'ArrowLeft':
        step = -10;
        break;
    }
    let active: number;
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

    const current: KeyboardNavItemDirective = items[active];
    let target: KeyboardNavItemDirective = items[active + step];

    // Favorites scrolling
    if (current.favorite) {
      if (target.favorite) {
        target.element.focus();
      } else {
        current.element.focus();
      }
    } else {
      // other scrolling
      console.log(current.dirIndex, target.dirIndex);
      target = items[active + step + 1];
      target.element.focus();
    }
  }

  @HostListener('keydown.ArrowRight', ['$event'])
  private _nav(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.items.length) {
      return;
    }

    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];

    const step: number = 1;
    let active: number;
    let i: number = this.items.length;
    while (i--) {
      if (items[i].element === document.activeElement) {
        active = i;
        break;
      }
    }

    let target: KeyboardNavItemDirective = items[active + step];

    if (target.dirIndex % 2 !== 0) {
      target = items[active + step];
      target.element.focus();
    }
  }

  @HostListener('keydown.ArrowLeft', ['$event'])
  private _navLeft(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.items.length) {
      return;
    }

    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];

    const step: number = -1;
    let active: number;
    let i: number = this.items.length;
    while (i--) {
      if (items[i].element === document.activeElement) {
        active = i;
        break;
      }
    }

    let target: KeyboardNavItemDirective = items[active + step];
    const current: KeyboardNavItemDirective = items[active];

    if (current.dirIndex !== 0 && target.dirIndex % 2 === 0) {
      target = items[active + step];
      target.element.focus();
    }
  }
}
