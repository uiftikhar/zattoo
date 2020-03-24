import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
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
  channels$: Observable<Channel[]>;
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
  public items: QueryList<ElementRef>;
  constructor(private readonly _channelsService: ChannelsService) {}

  public ngAfterViewInit(): void {
    setTimeout(() => {
      this.items.first.nativeElement.focus();
    }, 500);
  }

  ngOnInit(): void {
    this.channels$ = this._channelsService.getAvailableHighestQualityChannels();
  }

  goToFavorites(event: { favoritesMenu: boolean; index: number }) {
    this.favoritesMenu.emit(event);
  }
}
