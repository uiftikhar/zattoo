import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ChannelsService } from '../services/channels.service';
import { Channel } from '../interfaces/channel';
import { Observable } from 'rxjs';
import { KeyboardNavItemDirective } from '../../shared/directive/keyboard-nav-item.directive';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit {
  constructor(private readonly channelsService: ChannelsService) {}
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

  setLoadImages() {
    this.loadImages = true;
  }

  ngOnInit(): void {
    this.channelsService.getFavorites().subscribe(res => this.favorites = res);
  }

  goToChannels(event: { channelsMenu: boolean; index: number }) {
    this.channelsMenu.emit(event);
  }

  toggleFavorite(event: { channel: Channel; isFavorite: boolean }) {
    console.log(event.isFavorite);
    this.channelsService.toggleFavorite(event.channel, false);
  }
}
