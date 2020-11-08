import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMbComponent } from './map-mb.component';

describe('MapMbComponent', () => {
  let component: MapMbComponent;
  let fixture: ComponentFixture<MapMbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapMbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
