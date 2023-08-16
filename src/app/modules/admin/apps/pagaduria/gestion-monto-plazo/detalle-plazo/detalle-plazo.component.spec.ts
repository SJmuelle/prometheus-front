import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePlazoComponent } from './detalle-plazo.component';

describe('DetallePlazoComponent', () => {
  let component: DetallePlazoComponent;
  let fixture: ComponentFixture<DetallePlazoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePlazoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePlazoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
