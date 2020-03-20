import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';
import { fromEvent, Subscription, zip } from 'rxjs';
import { merge, mergeMap } from 'rxjs/operators';
import { flatten } from '@angular/compiler';
import { FavoritesComponent } from '../favorites/favorites.component';
import { ChannelsComponent } from '../channels/components/channels/channels.component';

@Component({
  selector: 'app-list-item-wrapper',
  template: '<ng-content></ng-content>',
  host: { tabindex: '0' },
  styleUrls: ['./list-item-wrapper.component.scss'],
})
export class ListItemWrapperComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(FavoritesComponent) fav: QueryList<FavoritesComponent>;
  @ContentChildren(ChannelsComponent) channels: QueryList<ChannelsComponent>;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;

  private subscription: Subscription;
  private keyManager: FocusKeyManager<ListItemComponent>;

  constructor() {
    this.onKeyPress();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress() {
    this.subscription = fromEvent(document, 'keydown').subscribe(
      (event: KeyboardEvent) => {
        const currentKey = this.keyManager.activeItemIndex;
        if (event.key === 'ArrowDown') {
          if (this.keyManager.activeItem.favorite) {
            this.keyManager.setNextItemActive();
          } else {
            this.keyManager.setNextItemActive();
            this.keyManager.setNextItemActive();
          }
          // this.keyManager.setNextItemActive();
          // this.keyManager.setNextItemActive();
          // this.keyManager.setNextItemActive();
          // const nextKey = currentKey + 2;
          // this.keyManager.setActiveItem(nextKey);
        }

        if (event.key === 'ArrowUp') {
          console.log(this.keyManager.activeItem.favorite);
          if (this.keyManager.activeItem.favorite) {
            this.keyManager.setPreviousItemActive();
          } else {
            this.keyManager.setPreviousItemActive();
            this.keyManager.setPreviousItemActive();
          }
          // const prevKey = currentKey - 2;
          // this.keyManager.setActiveItem(prevKey);
        }

        if (event.key === 'ArrowRight') {
          if (!this.keyManager.activeItem.favorite) {
            if (this.keyManager.activeItemIndex % 2 === 0) {
              this.keyManager.setNextItemActive();
            }
          }
        }

        if (event.key === 'ArrowLeft') {
          if (!this.keyManager.activeItem.favorite) {
            if (this.keyManager.activeItemIndex % 2 !== 0) {
              this.keyManager.setPreviousItemActive();
            }
          }
        }
      },
    );
  }

  ngAfterContentInit(): void {
    // this.keyManager2 = new FocusKeyManager(this.divs).withWrap();
    setTimeout(() => {
      this.items.reset([
        ...this.channels.first.items.toArray(),
        ...this.fav.first.items.toArray(),
      ]);
      console.log(1, this.items);
      console.log(2, this.channels, this.fav);
      this.keyManager = new FocusKeyManager(this.items).withWrap();
      console.log(this.fav, this.channels.first.items);
      this.keyManager.setFirstItemActive();
    }, 500);
  }
}
