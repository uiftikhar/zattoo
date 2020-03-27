import {ContentChildren, Directive, ElementRef, Input, QueryList, ViewChild} from '@angular/core';
import {Channel} from '../../channels/interfaces/channel';
import {KeyboardNavItemDirective} from './keyboard-nav-item.directive';
import {ListItemComponent} from '../list-item/list-item.component';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';

@Directive({
  selector: '[appKeyboardNavigation]',
})
export class KeyboardNavigationDirective {
  @Input() keyboardNavigationType: 'focus' | 'click' = 'click';
  @Input() items: Channel[];

  constructor(private _elementRef: ElementRef) {}


  @ViewChild(CdkVirtualScrollViewport)
  public items2: QueryList<CdkVirtualScrollViewport>;
  /**
   * Focus the previous element in the index.
   */
  previous(element) {

    const idx = this.items.findIndex(i => i === element);
    if (idx - 1 >= 0) {
      this.items[idx - 1][this.keyboardNavigationType]();
    }
  }

  /**
   * Focus the next element in the index.
   */
  next(element) {
    console.log(this.items2);
    const idx = this.items.findIndex(i => i === element);
    if (idx + 1 < this.items.length) {
      this.items[idx + 1][this.keyboardNavigationType]();
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
