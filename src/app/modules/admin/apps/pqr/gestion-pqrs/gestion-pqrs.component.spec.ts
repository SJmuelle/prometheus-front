import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPQRSComponent } from './gestion-pqrs.component';

describe('GestionPQRSComponent', () => {
  let component: GestionPQRSComponent;
  let fixture: ComponentFixture<GestionPQRSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionPQRSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPQRSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
