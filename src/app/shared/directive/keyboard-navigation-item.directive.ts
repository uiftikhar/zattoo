
import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';
import { KeyboardNavigationDirective } from './keyboard-navigation.directive';

@Directive({
  selector: '[appKeyboardNavigationItem]'
})
export class KeyboardNavigationItemDirective {

  @HostBinding('attr.tabindex') tabIndex = -1;

  @HostBinding('class.keyboard-navigation-item') can = true;

  constructor(
    private _elementRef: ElementRef,
    private _keyboardNavigation: KeyboardNavigationDirective
  ) {}

  /**
   * On click, focus the item.
   */
  @HostListener('click')
  onClick() {
    this._elementRef.nativeElement.focus();
  }

  /**
   * On keydown, direct to the previous or next element in the keyboard manager.
   */
  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this._keyboardNavigation.previous(this._elementRef.nativeElement);
    } else if (event.key === 'ArrowDown') {
      this._keyboardNavigation.next(this._elementRef.nativeElement);
    }
  }

}
