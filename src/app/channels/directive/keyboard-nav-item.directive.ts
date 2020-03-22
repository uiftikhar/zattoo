import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appKeyboardNavItem]',
})
export class KeyboardNavItemDirective {

  @Input() favorite: boolean = false;
  @Input() isLast: boolean = false;
  @Input() dirIndex: number = 0;

  constructor(private elementRef: ElementRef) {
    // console.log(this.element);
  }

  /**
   * Host native element.
   */
  public element: HTMLElement = this.elementRef.nativeElement;
}
