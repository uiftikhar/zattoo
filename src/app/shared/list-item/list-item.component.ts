import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
export class ListItemComponent implements OnChanges {
  @Input() channel: Channel;
  @Input() index: number;
  @Input() favorite: boolean = false;
  @Input() loadImages: boolean;
  @Input() scrollIntoView: boolean;
  @Output() toggleFavorite: EventEmitter<{
    channel: Channel;
    isFavorite: boolean;
  }> = new EventEmitter<{
    channel: Channel;
    isFavorite: boolean;
  }>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}
  @HostListener('keydown.Enter', ['$event'])
  private toggleFavorites(): void {
    this.toggleFavorite.emit({
      channel: this.channel,
      isFavorite: !this.channel.isFavorite,
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollIntoView) {
      console.log(this.elementRef.nativeElement);
    }
  }
}
