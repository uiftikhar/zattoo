import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, ContentChildren,
  HostListener,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ChannelsService } from '../../services/channels.service';
import { Observable } from 'rxjs';
import { Channel } from '../../interfaces/channel';
import { ListItemComponent } from '../../../list-item/list-item.component';
import { FocusKeyManager } from '@angular/cdk/a11y';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, AfterViewInit {
  channels$: Observable<Channel[]>;
  favorites: Channel[];
  @ViewChildren(ListItemComponent) _items: QueryList<ListItemComponent>;
  items: QueryList<ListItemComponent>;
  constructor(private readonly _channelsService: ChannelsService) {}


  ngAfterViewInit() {
    this.items = this._items;
  }
  ngOnInit(): void {
    this.channels$ = this._channelsService.getAvailableHighestQualityChannels();
    this._channelsService.getAvailableHighestQualityChannels().subscribe(res => {
      this.favorites = res.filter((_, index) => index < 10);
    });
  }
}
