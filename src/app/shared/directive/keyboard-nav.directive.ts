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
import {favoriteNavigation} from '../utils/favorites-navigation.util';
import {channelsNavigation} from '../utils/channels-navigation.util';

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

  /**
   * Keyboard nav items.
   */
  @ContentChildren(KeyboardNavItemDirective, { descendants: true })
  public items: QueryList<KeyboardNavItemDirective>;

  // TODO: favorites focus input and trigger?
  ngOnChanges(changes: SimpleChanges): void {
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
  }

  private getToFavoritesMenu({ favoritesMenu, index }) {
    const items: KeyboardNavItemDirective[] = this.items.toArray() as KeyboardNavItemDirective[];
    const _index = items.findIndex(item => item.isVisibleInView === true);
    const target = items && items[_index + index];
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

    const target = this.getTargetElement(event, {
      active,
      items,
    });
    const _index = items.findIndex(item => item.isVisibleInView === true);
    if (event.code === 'ArrowDown') {

    }
    if (event.code === 'ArrowUp') {
      target.element.scrollIntoView({
        // type ScrollLogicalPosition = "start" | "center" | "end" | "nearest";
        block: 'nearest',
      });
    }
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
      return channelsNavigation(event, { active, items, current });
    }
  }

}
