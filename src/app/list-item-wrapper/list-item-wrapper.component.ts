import {
  AfterContentInit,
  AfterViewInit,
  Component, ContentChild,
  ContentChildren,
  HostListener,
  QueryList, ViewChild,
} from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-list-item-wrapper',
  template: '<ng-content></ng-content>',
  host: { tabindex: '0' },
  styleUrls: ['./list-item-wrapper.component.scss'],
})
export class ListItemWrapperComponent
  implements AfterContentInit, AfterViewInit {
  @ContentChild(ListItemComponent) item: ListItemComponent;
  @ViewChild(ListItemComponent) item1: ListItemComponent;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  private keyManager: FocusKeyManager<ListItemComponent>;

  @HostListener('keydown', ['$event'])
  manage(event) {
    console.log(event);
    this.keyManager.onKeydown(event);
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    console.log(this.item,this.item1);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.keyManager.setFirstItemActive();
    });
  }
}
