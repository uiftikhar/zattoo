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
  implements AfterContentInit {
  @ContentChild(ListItemComponent) item: ListItemComponent;
  @ViewChild(ListItemComponent) item1: ListItemComponent;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent>;
  private keyManager: FocusKeyManager<ListItemComponent>;

  @HostListener('keydown', ['$event'])
  manage(event) {
    this.keyManager.onKeydown(event);
    this.keyManager.setNextItemActive();
  }

  ngAfterContentInit(): void {
    this.keyManager = new FocusKeyManager(this.items).withWrap();
    setTimeout(() => {
      // this.items.forEach(ins => console.log(ins));
      this.keyManager.setFirstItemActive();
    }, 100);
  }
}
