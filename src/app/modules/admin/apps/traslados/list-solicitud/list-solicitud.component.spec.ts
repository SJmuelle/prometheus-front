import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSolicitudComponent } from './list-solicitud.component';

describe('ListSolicitudComponent', () => {
  let component: ListSolicitudComponent;
  let fixture: ComponentFixture<ListSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSolicitudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
