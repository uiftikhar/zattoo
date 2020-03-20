import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  HostListener,
  OnDestroy,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';
import { fromEvent, Subscription, zip } from 'rxjs';
import { merge, mergeMap } from 'rxjs/operators';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-list-item-wrapper',
  template: '<ng-content></ng-content>',
  host: { tabindex: '0' },
  styleUrls: ['./list-item-wrapper.component.scss'],
})
export class ListItemWrapperComponent implements AfterContentInit, OnDestroy {
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
          this.keyManager.setNextItemActive();
          // const nextKey = currentKey + 2;
          // this.keyManager.setActiveItem(nextKey);
        }

        if (event.key === 'ArrowUp') {
          this.keyManager.setPreviousItemActive();
          // const prevKey = currentKey - 2;
          // this.keyManager.setActiveItem(prevKey);
        }

        if (event.key === 'ArrowRight') {
            this.keyManager.setNextItemActive();
        }

        if (event.key === 'ArrowLeft') {
            this.keyManager.setPreviousItemActive();
        }
      },
    );
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    setTimeout(() => {
      this.keyManager.setFirstItemActive();
      console.log(this.items)
    }, 100);
  }
}
