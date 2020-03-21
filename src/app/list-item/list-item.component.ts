import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output, ViewChild,
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
export class ListItemComponent implements FocusableOption, AfterViewInit {
  @Input() channel: Channel;
  @Input() index: number;
  @Input() favorite = false;
  constructor(private readonly _elementRef: ElementRef) {}
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  private scrollContainer: any;

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame;
    // console.log(this.scrollContainer.scroll());
  }

  focus() {
    this._elementRef.nativeElement.focus();
  }
}
