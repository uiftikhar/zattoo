import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appClass]',
})
export class ClassDirective {
  @HostBinding('class') @Input('class') className = '';
}
