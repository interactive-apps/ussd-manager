import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataElementOptionsComponent } from './data-element-options.component';

describe('DataElementOptionsComponent', () => {
  let component: DataElementOptionsComponent;
  let fixture: ComponentFixture<DataElementOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataElementOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataElementOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
