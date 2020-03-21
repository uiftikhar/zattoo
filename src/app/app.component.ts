import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Channel } from './channels/interfaces/channel';
import { ChannelsService } from './channels/services/channels.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'zattoo';
  favorites: Channel[];
  channels$: Observable<Channel[]>;

  /**
   * Navigable items.
   */
  @ViewChildren('item', { read: ElementRef })
  public items: QueryList<ElementRef>;
  constructor(private readonly _channelsService: ChannelsService) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.items.first.nativeElement.focus();
    }, 500);
  }

  ngOnInit(): void {
    this.channels$ = this._channelsService.getAvailableHighestQualityChannels();
    this._channelsService
      .getAvailableHighestQualityChannels()
      .subscribe(res => {
        this.favorites = res.filter((abc, index) => index < 9);
      });
  }
}
