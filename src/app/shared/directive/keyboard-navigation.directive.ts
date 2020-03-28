import {ContentChildren, Directive, ElementRef, Input, QueryList, ViewChild} from '@angular/core';
import {Channel} from '../../channels/interfaces/channel';
import {KeyboardNavItemDirective} from './keyboard-nav-item.directive';
import {ListItemComponent} from '../list-item/list-item.component';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {VirtualScrollerComponent} from 'ngx-virtual-scroller';

@Directive({
  selector: '[appKeyboardNavigation]',
})
export class KeyboardNavigationDirective {
  @Input() keyboardNavigationType: 'focus' | 'click' = 'click';
  @Input() items: Channel[];

  constructor(private _elementRef: ElementRef) {}


  @ContentChildren(VirtualScrollerComponent, { descendants: true })
  public virtualScroll: QueryList<VirtualScrollerComponent>;
  /**
   * Focus the previous element in the index.
   */
  previous(element) {
    const items = this.getItems();
    const idx = items.findIndex(i => i === element);
    if (idx - 1 >= 0) {
      items[idx - 1][this.keyboardNavigationType]();
    }
  }

  /**
   * Focus the next element in the index.
   */
  next(element) {
    const items = this.getItems();
    const idx = items.findIndex(i => i === element);
    if (idx + 1 < items.length) {
      items[idx + 1][this.keyboardNavigationType]();
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
