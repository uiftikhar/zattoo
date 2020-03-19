import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemWrapperComponent } from './list-item-wrapper.component';

describe('ListItemWrapperComponent', () => {
  let component: ListItemWrapperComponent;
  let fixture: ComponentFixture<ListItemWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListItemWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
