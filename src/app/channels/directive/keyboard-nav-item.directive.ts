import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input, OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appKeyboardNavItem]',
})
export class KeyboardNavItemDirective implements AfterViewInit, OnDestroy {
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

  @Output() goToChannelsMenu: EventEmitter<{
    channelsMenu: boolean;
    index: number;
  }> = new EventEmitter<{
    channelsMenu: false;
    index: 0;
  }>();

  constructor(private elementRef: ElementRef) {
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
        } else {
          this.isVisibleInView = false;
        }
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

  channelsMenu(index: number) {
    this.goToChannelsMenu.emit({
      channelsMenu: true,
      index,
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
