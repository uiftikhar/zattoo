import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Channel } from '../channels/interfaces/channel';
import { FocusableOption } from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  host: {
    tabindex: '-1',
  },
})
export class ListItemComponent implements FocusableOption {
  @Input() channel: Channel;
  @Input() index: number;
  @Input() favorite = false;
  constructor(private readonly _elementRef: ElementRef) {}

  focus() {
    console.log(13);
    this._elementRef.nativeElement.focus();
    console.log(this.favorite);
  }
}
