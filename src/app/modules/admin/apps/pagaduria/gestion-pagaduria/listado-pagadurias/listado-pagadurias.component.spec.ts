import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPagaduriasComponent } from './listado-pagadurias.component';

describe('ListadoPagaduriasComponent', () => {
  let component: ListadoPagaduriasComponent;
  let fixture: ComponentFixture<ListadoPagaduriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPagaduriasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPagaduriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
