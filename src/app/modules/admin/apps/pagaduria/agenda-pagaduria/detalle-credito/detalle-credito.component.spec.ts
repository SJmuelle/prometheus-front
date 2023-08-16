import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCreditoComponent } from './detalle-credito.component';

describe('DetalleCreditoComponent', () => {
  let component: DetalleCreditoComponent;
  let fixture: ComponentFixture<DetalleCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
