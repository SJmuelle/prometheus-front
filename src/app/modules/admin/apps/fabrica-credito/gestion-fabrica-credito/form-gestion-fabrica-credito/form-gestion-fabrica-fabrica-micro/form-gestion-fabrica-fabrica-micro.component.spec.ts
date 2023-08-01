import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGestionFabricaFabricaMicroComponent } from './form-gestion-fabrica-fabrica-micro.component';

describe('FormGestionFabricaFabricaMicroComponent', () => {
  let component: FormGestionFabricaFabricaMicroComponent;
  let fixture: ComponentFixture<FormGestionFabricaFabricaMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGestionFabricaFabricaMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGestionFabricaFabricaMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
