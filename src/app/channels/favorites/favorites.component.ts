import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ChannelsService } from '../services/channels.service';
import { Channel } from '../interfaces/channel';
import { Observable } from 'rxjs';
import { KeyboardNavItemDirective } from '../../shared/directive/keyboard-nav-item.directive';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(
    private readonly channelsService: ChannelsService,
    private renderer: Renderer2,
    private zone: NgZone,
  ) {}
  @Input() switchToFavoritesMenu: {
    favoritesMenu: boolean;
    index: number;
  };

  @Output() channelsMenu: EventEmitter<{
    channelsMenu: boolean;
    index: number;
  }> = new EventEmitter<{
    channelsMenu: false;
    index: 0;
  }>();

  loadImages: boolean = false;
  favorites: Channel[];
  focusNextElementID: string;

  setLoadImages() {
    this.loadImages = true;
  }

  ngOnInit(): void {
    this.channelsService.getFavorites().subscribe(res => {
      this.favorites = res;
    });
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
