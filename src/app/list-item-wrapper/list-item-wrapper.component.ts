import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef, HostBinding,
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
  host: { tabindex: '0', '[class.className]': 'isFixed' },
  styleUrls: ['./list-item-wrapper.component.scss'],
})
export class ListItemWrapperComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(FavoritesComponent) fav: QueryList<FavoritesComponent>;
  @ContentChildren(ChannelsComponent) channels: QueryList<ChannelsComponent>;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  @HostBinding('class.isFixed') isFixed = false;
  private subscription: Subscription;
  private keyManager: FocusKeyManager<ListItemComponent>;

  constructor() {
    this.onKeyPress();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    console.log('scroll');
  }


  onKeyPress() {
    this.subscription = fromEvent(document, 'keydown').subscribe(
      (event: KeyboardEvent) => {
        const currentKey = this.keyManager.activeItemIndex;
        /*
        const elem = this.keyManager.activeItem._elementRef.nativeElement;
        if (elem.offsetTop >= 224) {
          console.log(123, elem);
          this.isFixed = true;
        }*/
        if (event.key === 'ArrowDown') {
          if (this.keyManager.activeItem.favorite) {
            this.keyManager.setNextItemActive();
          } else {
            const nextKey = currentKey + 2;
            this.keyManager.setActiveItem(nextKey);
          }
          // this.keyManager.setNextItemActive();
          // this.keyManager.setNextItemActive();
          // this.keyManager.setNextItemActive();
        }

        if (event.key === 'ArrowUp') {
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
          } else {
            if (this.keyManager.activeItemIndex === 217) {
              this.keyManager.setActiveItem(0);
            }
            if (this.keyManager.activeItemIndex === 218) {
              this.keyManager.setActiveItem(2);
            }
            if (this.keyManager.activeItemIndex === 219) {
              this.keyManager.setActiveItem(4);
            }
            if (this.keyManager.activeItemIndex === 220) {
              this.keyManager.setActiveItem(6);
            }
            if (this.keyManager.activeItemIndex === 221) {
              this.keyManager.setActiveItem(8);
            }
            if (this.keyManager.activeItemIndex === 222) {
              this.keyManager.setActiveItem(10);
            }
            if (this.keyManager.activeItemIndex === 223) {
              this.keyManager.setActiveItem(12);
            }
            if (this.keyManager.activeItemIndex === 224) {
              this.keyManager.setActiveItem(14);
            }
            if (this.keyManager.activeItemIndex === 225) {
              this.keyManager.setActiveItem(16);
            }
            if (this.keyManager.activeItemIndex === 226) {
              this.keyManager.setActiveItem(18);
            }
          }
        }

        if (event.key === 'ArrowLeft') {
          if (!this.keyManager.activeItem.favorite) {
            if (this.keyManager.activeItemIndex % 2 !== 0) {
              this.keyManager.setPreviousItemActive();
            } else {
              if (this.keyManager.activeItemIndex === 0) {
                this.keyManager.setActiveItem(217);
              }
              if (this.keyManager.activeItemIndex === 2) {
                this.keyManager.setActiveItem(218);
              }
              if (this.keyManager.activeItemIndex === 4) {
                this.keyManager.setActiveItem(219);
              }
              if (this.keyManager.activeItemIndex === 6) {
                this.keyManager.setActiveItem(220);
              }
              if (this.keyManager.activeItemIndex === 8) {
                this.keyManager.setActiveItem(221);
              }
              if (this.keyManager.activeItemIndex === 10) {
                this.keyManager.setActiveItem(222);
              }
              if (this.keyManager.activeItemIndex === 12) {
                this.keyManager.setActiveItem(223);
              }
              if (this.keyManager.activeItemIndex === 14) {
                this.keyManager.setActiveItem(224);
              }
              if (this.keyManager.activeItemIndex === 16) {
                this.keyManager.setActiveItem(225);
              }
              if (this.keyManager.activeItemIndex === 18) {
                this.keyManager.setActiveItem(226);
              }
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
      this.keyManager = new FocusKeyManager(this.items).withWrap();
      this.keyManager.setFirstItemActive();
    }, 500);
  }
}
