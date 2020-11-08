import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TpInfoComponent } from './tp-info.component';

describe('TpInfoComponent', () => {
  let component: TpInfoComponent;
  let fixture: ComponentFixture<TpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
