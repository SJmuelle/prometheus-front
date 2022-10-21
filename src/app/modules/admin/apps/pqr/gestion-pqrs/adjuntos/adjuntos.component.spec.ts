import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjuntosComponent } from './adjuntos.component';

describe('AdjuntosComponent', () => {
  let component: AdjuntosComponent;
  let fixture: ComponentFixture<AdjuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdjuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdjuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
