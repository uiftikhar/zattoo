import { Component, OnInit } from '@angular/core';
import {ChannelsService} from '../../services/channels.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.css']
})
export class ChannelsComponent implements OnInit {

  constructor(private readonly _channelsService: ChannelsService) { }

  ngOnInit(): void {
    this._channelsService.getAvailableHighestQualityChannels().subscribe(console.log);
  }

}
