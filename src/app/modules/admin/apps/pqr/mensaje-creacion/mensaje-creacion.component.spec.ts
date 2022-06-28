import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCreacionComponent } from './mensaje-creacion.component';

describe('MensajeCreacionComponent', () => {
  let component: MensajeCreacionComponent;
  let fixture: ComponentFixture<MensajeCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeCreacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
