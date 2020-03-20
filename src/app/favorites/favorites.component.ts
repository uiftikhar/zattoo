import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { ChannelsService } from '../channels/services/channels.service';
import { Observable } from 'rxjs';
import { Channel } from '../channels/interfaces/channel';
import {ListItemComponent} from '../list-item/list-item.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, AfterViewInit {
  constructor(private readonly channelsService: ChannelsService) {}
  @ViewChildren(ListItemComponent) _items: QueryList<ListItemComponent>;
  items: QueryList<ListItemComponent>;

  favorites: Channel[];
  ngOnInit(): void {
    this.channelsService.getAvailableHighestQualityChannels().subscribe(res => {
      this.favorites = res.filter((_, index) => index < 10);
    });
  }

  ngAfterViewInit() {
    this.items = this._items;
  }
}
