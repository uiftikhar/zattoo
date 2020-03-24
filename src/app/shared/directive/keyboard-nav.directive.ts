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

  @Input() switchToChannelsMenu: {
    channelsMenu: boolean;
    index: number;
  };

  /**
   * Keyboard nav items.
   */
  @ContentChildren(KeyboardNavItemDirective, { descendants: true })
  public items: QueryList<KeyboardNavItemDirective>;

  // TODO: Lazyload imagess
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
        inline: 'center',
      });
    }
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
      return this._favoriteNavigation(event, { active, items, current });
    } else {
      return this._channelsNavigation(event, { active, items, current });
    }
  }

  private _favoriteNavigation(
    event: KeyboardEvent,
    element: {
      active: number;
      items: KeyboardNavItemDirective[];
      current: KeyboardNavItemDirective;
    },
  ): KeyboardNavItemDirective {
    const { items, active, current } = element;
    let target: KeyboardNavItemDirective = current;
    switch (event.code) {
      case 'ArrowDown':
        if (!current.isLast) {
          target = items[active + 1];
        }
        break;
      case 'ArrowRight':
        const index = items.findIndex(item => item.isVisibleInView);
        const numberOfElementsToSkip = current.dirIndex - index;
        target.channelsMenu(numberOfElementsToSkip);
        break;
      case 'ArrowUp':
        if (current.dirIndex !== 0) {
          target = items[active - 1];
        }
        break;
    }
    return target;
  }

  private _channelsNavigation(
    event: KeyboardEvent,
    element: {
      active: number;
      items: KeyboardNavItemDirective[];
      current: KeyboardNavItemDirective;
    },
  ): KeyboardNavItemDirective {
    const { items, active, current } = element;
    let target: KeyboardNavItemDirective = current;
    let step: number = 1;
    switch (event.code) {
      case 'ArrowDown':
        step = 2;
        target = items[active + step];
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
          target.favoritesMenu(numberOfElementsToSkip);
        }
        break;
      case 'ArrowUp':
        step = 2;
        if (current.dirIndex !== 0 && current.dirIndex !== 1) {
          target = items[active - step];
        }
        break;
    }

    return target;
  }
}
