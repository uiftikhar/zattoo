import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChannelsService } from '../channels/services/channels.service';
import { Channel } from '../channels/interfaces/channel';

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

  favorites: Channel[];
  ngOnInit(): void {
    this.channelsService.getAvailableHighestQualityChannels().subscribe(res => {
      this.favorites = res.filter((_, index) => index < 20);
    });
  }

  goToChannels(event: { channelsMenu: boolean; index: number }) {
    this.channelsMenu.emit(event);
  }
}
