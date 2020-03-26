import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ChannelsService } from '../services/channels.service';
import { Channel } from '../interfaces/channel';
import { Observable } from 'rxjs';
import { KeyboardNavItemDirective } from '../../shared/directive/keyboard-nav-item.directive';
import { switchMap } from 'rxjs/operators';
import { ListItemComponent } from '../../shared/list-item/list-item.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly channelsService: ChannelsService,
    private elementRef: ElementRef<HTMLElement>,
  ) {}
  @Input() switchToFavoritesMenu: {
    favoritesMenu: boolean;
    index: number;
  };

  @ViewChildren('item', { read: ElementRef })
  public items: QueryList<ElementRef>;

  @Output() channelsMenu: EventEmitter<{
    channelsMenu: boolean;
    index: number;
  }> = new EventEmitter<{
    channelsMenu: false;
    index: 0;
  }>();

  loadImages: boolean = false;
  favorites: Channel[] = [];
  focusNextElementID: string;

  setLoadImages() {
    this.loadImages = true;
  }

  ngOnInit(): void {
    this.channelsService.favoritesSubject$.subscribe(res => {
      this.favorites = res;
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.items.changes.subscribe(item => {
        if (this.items && this.items.last) {
          this.items.last.nativeElement.scrollIntoView();
        }
      });
    }, 500);
  }

  goToChannels(event: { channelsMenu: boolean; index: number }) {
    this.channelsMenu.emit(event);
  }

  removeFavorite(event: { channel: Channel; isFavorite: boolean }) {
    this.focusNextElementID = this.favorites.find(
      favorites => favorites.id === event.channel.id,
    ).id;
    this.channelsService.toggleFavorite(event.channel, event.isFavorite);
    if (this.favorites.length === 0) {
      this.goToChannels({ channelsMenu: true, index: 0 });
    }
  }
}
