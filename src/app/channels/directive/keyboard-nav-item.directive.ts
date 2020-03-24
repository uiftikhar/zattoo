import {
  AfterViewInit,
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
export class KeyboardNavItemDirective implements AfterViewInit {
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
  private observer: IntersectionObserver;

  isVisibleInView = false;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting === true) {
          this.isVisibleInView = true;
          // this.observer.disconnect();
        } else {
          this.isVisibleInView = false;
        }
        // console.log('test');
      },
      {
        threshold: 0.75,
      },
    );

    this.observer.observe(this.elementRef.nativeElement as HTMLElement);
  }

  favoritesMenu(index: number) {
    this.goToFavorites.emit({
      favoritesMenu: true,
      index,
    });
  }
}
