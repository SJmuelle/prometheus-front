import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoChequeoComponent } from './listado-chequeo.component';

describe('ListadoChequeoComponent', () => {
  let component: ListadoChequeoComponent;
  let fixture: ComponentFixture<ListadoChequeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoChequeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoChequeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
