import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosNegociosComponent } from './listados-negocios.component';

describe('ListadosNegociosComponent', () => {
  let component: ListadosNegociosComponent;
  let fixture: ComponentFixture<ListadosNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosNegociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadosNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
