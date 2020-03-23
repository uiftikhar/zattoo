import {Component, Input, OnInit} from '@angular/core';
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
  favorites: Channel[];
  ngOnInit(): void {
    this.channelsService.getAvailableHighestQualityChannels().subscribe(res => {
      this.favorites = res.filter((_, index) => index < 10);
    });
  }
}
