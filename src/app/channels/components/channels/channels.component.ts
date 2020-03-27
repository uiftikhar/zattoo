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
  constructor(private readonly _channelsService: ChannelsService) {}
  loadImages: boolean = false;

  public ngAfterViewInit(): void {
    setTimeout(() => {
      // this.items.first.nativeElement.focus();
    }, 500);
  }

  setLoadImages() {
    this.loadImages = true;
  }

  ngOnInit(): void {
    this._channelsService
      .getAvailableHighestQualityChannels()
      .subscribe(res => (this.channels = res));
  }

  goToFavorites(event: { favoritesMenu: boolean; index: number }) {
    this.favoritesMenu.emit(event);
  }

  toggleFavorite(event: { channel: Channel; isFavorite: boolean }) {
    this._channelsService.toggleFavorite(event.channel, event.isFavorite);
  }
}
