import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionFabricaCreditoComponent } from './form-gestion-fabrica-credito.component';

describe('FormGestionFabricaCreditoComponent', () => {
  let component: FormGestionFabricaCreditoComponent;
  let fixture: ComponentFixture<FormGestionFabricaCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
