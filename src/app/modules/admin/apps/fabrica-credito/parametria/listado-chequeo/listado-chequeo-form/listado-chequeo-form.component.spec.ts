import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoChequeoFormComponent } from './listado-chequeo-form.component';

describe('ListadoChequeoFormComponent', () => {
  let component: ListadoChequeoFormComponent;
  let fixture: ComponentFixture<ListadoChequeoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoChequeoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoChequeoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
