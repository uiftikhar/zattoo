import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appKeyboardNavigation]',
})
export class KeyboardNavigationDirective {
  @Input('keyboardNavigationType') type: 'focus' | 'click' = 'click';

  constructor(private _elementRef: ElementRef) {}

  /**
   * Focus the previous element in the index.
   */
  previous(element) {
    const items = this.getItems();
    const idx = items.findIndex(i => i === element);
    if (idx - 1 >= 0) {
      items[idx - 1][this.type]();
    }
  }

  /**
   * Focus the next element in the index.
   */
  next(element) {
    const items = this.getItems();
    const idx = items.findIndex(i => i === element);
    if (idx + 1 < items.length) {
      items[idx + 1][this.type]();
    }
  }

  /**
   * Get the list of items in view.
   */
  getItems(): HTMLElement[] {
    return Array.from(
      this._elementRef.nativeElement.getElementsByClassName(
        'keyboard-navigation-item',
      ),
    );
  }
}
