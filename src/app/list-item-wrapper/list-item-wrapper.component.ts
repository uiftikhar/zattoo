import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  HostListener,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';
import { fromEvent, zip } from 'rxjs';
import { merge, mergeMap } from 'rxjs/operators';
import { flatten } from '@angular/compiler';

@Component({
  selector: 'app-list-item-wrapper',
  template: '<ng-content></ng-content>',
  host: { tabindex: '0' },
  styleUrls: ['./list-item-wrapper.component.scss'],
})
export class ListItemWrapperComponent implements AfterContentInit {
  @ContentChild(ListItemComponent) item: ListItemComponent;
  @ViewChild(ListItemComponent) item1: ListItemComponent;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  private keyManager: FocusKeyManager<ListItemComponent>;

  constructor() {
    this.onKeyPress();
  }

  onKeyPress() {
    fromEvent(document, 'keydown').subscribe((event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        this.keyManager.onKeydown(event);
        this.keyManager.setNextItemActive();
      }

      if (event.key === 'ArrowUp') {
        this.keyManager.onKeydown(event);
        this.keyManager.setPreviousItemActive();
      }

      if (event.key === 'ArrowRight') {
        if (this.keyManager.activeItemIndex % 2 === 0) {
          this.keyManager.setNextItemActive();
        }
      }

      if (event.key === 'ArrowLeft') {
        if (this.keyManager.activeItemIndex % 2 !== 0) {
          this.keyManager.setPreviousItemActive();
        }
      }
    });
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    setTimeout(() => {
      // this.items.forEach(ins => console.log(ins));
      this.keyManager.setFirstItemActive();
    }, 100);
  }
}
