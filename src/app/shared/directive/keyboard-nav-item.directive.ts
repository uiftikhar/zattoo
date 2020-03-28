import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
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

  @Output() public deferLoad: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  /**
   * Host native element.
   */
  public element: HTMLElement = this.elementRef.nativeElement;
  private observer: IntersectionObserver;

  isVisibleInView = false;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      entries => {
        this.checkForIntersection(entries);
      },
      {
        threshold: 0.75,
      },
    );

    this.observer.observe(this.elementRef.nativeElement as HTMLElement);
  }

  private checkForIntersection = (
    entries: Array<IntersectionObserverEntry>,
  ) => {
    entries.forEach((entry: IntersectionObserverEntry) => {
      this.isVisibleInView = false;
      if (this.checkIfIntersecting(entry)) {
        this.deferLoad.emit();
        this.isVisibleInView = true;
      }
    });
  };

  private checkIfIntersecting(entry: IntersectionObserverEntry) {
    return (
      (<any>entry).isIntersecting &&
      entry.target === this.elementRef.nativeElement
    );
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
    this.observer.unobserve(<Element>this.elementRef.nativeElement);
    this.observer.disconnect();
  }
}
