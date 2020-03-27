import {
  AfterContentInit,
  AfterViewInit,
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
import { favoriteNavigation } from '../utils/favorites-navigation.util';
import { channelsNavigation } from '../utils/channels-navigation.util';

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

  @Input() switchToChannelsMenu: {
    channelsMenu: boolean;
    index: number;
  };

  @Input() focusNext: number;

  /**
   * Keyboard nav items.
   */
  @ContentChildren(KeyboardNavItemDirective, { descendants: true })
  public items: QueryList<KeyboardNavItemDirective>;

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('directive', changes.focusNext);
    if (
      changes.switchToFavoritesMenu &&
      changes.switchToFavoritesMenu.currentValue
    ) {
      const response: {
        favoritesMenu: boolean;
        index: number;
      } = {
        index: changes.switchToFavoritesMenu.currentValue.index,
        favoritesMenu: changes.switchToFavoritesMenu.currentValue.favoritesMenu,
      };
      this.getToFavoritesMenu(response);
    }

    if (
      changes.switchToChannelsMenu &&
      changes.switchToChannelsMenu.currentValue
    ) {
      const response: {
        switchToChannelsMenu: boolean;
        index: number;
      } = {
        index: changes.switchToChannelsMenu.currentValue.index,
        switchToChannelsMenu:
          changes.switchToChannelsMenu.currentValue.favoritesMenu,
      };
      this.getToChannelsMenu(response);
    }

    if (changes.focusNext && changes.focusNext.currentValue !== undefined) {
      this._focusNextElement();
    }
  }

  private _focusNextElement() {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];
    const active: number = this.getActiveItemIndex();
    if (active + 1 < items.length) {
      items[active + 1].element.focus();
    } else if (active - 1 > -1) {
      items[active - 1].element.focus();
    }
  }

  private getToFavoritesMenu({ favoritesMenu, index }) {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];
    const _index = items.findIndex(item => item.isVisibleInView === true);
    let redirectIndex = _index + index;
    if (redirectIndex > items.length - 1) {
      redirectIndex = items.length - 1;
    }
    const target = items && items[redirectIndex];
    if (target) {
      target.element.focus();
    }
  }

  private getToChannelsMenu({ switchToChannelsMenu, index }) {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];
    const _index = items.findIndex(item => item.isVisibleInView === true);
    const target = items && items[_index + 2 * index];
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
    const active: number = this.getActiveItemIndex();

    const { target, isGoingToChannelsNavigation } = this.getTargetElement(
      event,
      {
        active,
        items,
      },
    );

    target.element.scrollIntoView({
      block: 'center'
    })
    target.element.focus();
  }

  private getActiveItemIndex() {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];

    let active: number = 0;
    let i: number = this.items.length;
    while (i--) {
      if (items[i].element === document.activeElement) {
        active = i;
        break;
      }
    }
    return active;
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
    const isFavoriteNavigation = current.favorite;
    if (isFavoriteNavigation) {
      return favoriteNavigation(event, { active, items, current });
    } else {
      const resp = {
        target: channelsNavigation(event, { active, items, current }),
        isGoingToChannelsNavigation: false,
      };
      return resp;
    }
  }
}
