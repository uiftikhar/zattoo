import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
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
export class ChannelsComponent implements OnInit {
  channels$: Observable<Channel[]>;

  constructor(private readonly _channelsService: ChannelsService) {}

  ngOnInit(): void {
    this.channels$ = this._channelsService.getAvailableHighestQualityChannels();
  }
}
