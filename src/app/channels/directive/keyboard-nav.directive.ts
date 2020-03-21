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
  @HostListener('keydown.ArrowDown', ['$event'])
  private nav(event: KeyboardEvent): void {
    event.stopPropagation();
    event.preventDefault();

    if (!this.items.length) {
      return;
    }

    const items: KeyboardNavItemDirective[] = this.items.toArray();
    const step: number = event.code === 'ArrowUp' ? -1 : 1;
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

    const target: KeyboardNavItemDirective = items[active + step];

    console.log(target);
    // if (i !== 0 && i % 7 === 0) {
    //   console.log("LL", active);
    //   // target = items[active + step];
    // }
    if (target) {

      target.element.focus();
    }
  }
}
