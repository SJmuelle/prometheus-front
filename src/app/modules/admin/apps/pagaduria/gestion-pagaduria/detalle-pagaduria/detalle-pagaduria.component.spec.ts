import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePagaduriaComponent } from './detalle-pagaduria.component';

describe('DetallePagaduriaComponent', () => {
  let component: DetallePagaduriaComponent;
  let fixture: ComponentFixture<DetallePagaduriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePagaduriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePagaduriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
