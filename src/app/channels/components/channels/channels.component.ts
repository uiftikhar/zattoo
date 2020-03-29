import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { Observable } from 'rxjs';
import { Channel } from '../../interfaces/channel';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, AfterViewInit {
  channels: Channel[];
  favorites: Channel[];
  @Output() favoritesMenu: EventEmitter<{
    favoritesMenu: boolean;
    index: number;
  }> = new EventEmitter<{
    favoritesMenu: false;
    index: 0;
  }>();

  @Input() switchToChannelsMenu: {
    channelsMenu: boolean;
    index: number;
  };

  @ViewChildren('item', { read: ElementRef })
  public items: QueryList<ElementRef<HTMLElement>>;

  @ViewChild('itemContainer', { read: ElementRef })
  public itemsContainer: ElementRef<HTMLElement>;

  @ViewChild('scroll')
  private virtualScroll: VirtualScrollerComponent;


  // call this function whenever you have to focus on second item
  loadImages: boolean = false;


  constructor(
    private readonly _channelsService: ChannelsService,
    private el: ElementRef,
  ) {}

  public ngAfterViewInit(): void {

    this.virtualScroll.scrollAnimationTime = 0;
    setTimeout(() => {
    console.log(this.virtualScroll);
      // this.items.first.nativeElement.focus();

    }, 500);
  }

  getABC(): HTMLElement[] {
    return this.el.nativeElement.getElementsByClassName(
      'keyboard-navigation-item',
    );
  }

  abc(event) {
    console.log(event);
  }
  currentIndex(index) {
    // console.log(
    //   'currentIndex',
    //   index,
    //   this.viewport.measureScrollOffset('top'),
    // );
    // this.viewport.scrollToIndex(index);
    // this.viewport.setRenderedContentOffset(400, 'to-end');
  }

  setLoadImages() {
    this.loadImages = true;
  }

  ngOnInit(): void {
    this._channelsService
      .getAvailableHighestQualityChannels()
      .subscribe(res => {
        this.channels = res;
      });
  }

  goToFavorites(event: { favoritesMenu: boolean; index: number }) {
    this.favoritesMenu.emit(event);
  }

  toggleFavorite(event: { channel: Channel; isFavorite: boolean }) {
    this._channelsService.toggleFavorite(event.channel, event.isFavorite);
  }
}
