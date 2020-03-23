import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appKeyboardNavItem]',
})
export class KeyboardNavItemDirective {
  @Input() favorite: boolean = false;
  @Input() isLast: boolean = false;
  @Input() dirIndex: number = 0;
  @Input() favLength: number = 0;
  @Output() goToFavorites: EventEmitter<{
    favoritesMenu: boolean;
    index: number;
  }> = new EventEmitter<{
    favoritesMenu: false;
    index: 0;
  }>();
  constructor(private elementRef: ElementRef) {
    // console.log(this.element);
  }

  /**
   * Host native element.
   */
  public element: HTMLElement = this.elementRef.nativeElement;

  favoritesMenu(index: number) {
    this.goToFavorites.emit({
      favoritesMenu: true,
      index,
    });
  }
}
