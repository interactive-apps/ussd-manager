import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFlowComponent } from './menu-flow.component';

describe('MenuFlowComponent', () => {
  let component: MenuFlowComponent;
  let fixture: ComponentFixture<MenuFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
