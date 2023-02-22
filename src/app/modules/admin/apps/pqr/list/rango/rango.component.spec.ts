import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangoComponent } from './rango.component';

describe('RangoComponent', () => {
  let component: RangoComponent;
  let fixture: ComponentFixture<RangoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RangoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
