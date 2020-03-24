import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Channel } from '../../channels/interfaces/channel';

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
  @Input() loadImages: boolean;
  @Output() toggleFavorite: EventEmitter<{
    channel: Channel;
    isFavorite: boolean;
  }> = new EventEmitter<{
    channel: Channel;
    isFavorite: boolean;
  }>();
  @HostListener('keydown.Enter', ['$event'])
  private toggleFavorites(): void {
    this.toggleFavorite.emit({
      channel: this.channel,
      isFavorite: !this.favorite,
    });
  }
}
