import {
  Component,
  Input,
} from '@angular/core';
import { Channel } from '../channels/interfaces/channel';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    tabindex: '-1',
  },
})
export class ListItemComponent {
  @Input() channel: Channel;
  @Input() index: number;
  @Input() favorite: boolean = false;

  // isVisibleInView = false;
}
