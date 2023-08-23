import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPlazosComponent } from './listado-plazos.component';

describe('ListadoPlazosComponent', () => {
  let component: ListadoPlazosComponent;
  let fixture: ComponentFixture<ListadoPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPlazosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
