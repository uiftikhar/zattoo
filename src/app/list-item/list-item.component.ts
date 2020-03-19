import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import { Channel } from '../channels/interfaces/channel';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: { tabindex: '-1' },
})
export class ListItemComponent {
  @Input() channel: Channel;
  @Input() index: number;
}
