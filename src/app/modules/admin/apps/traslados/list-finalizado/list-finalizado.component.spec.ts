import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinalizadoComponent } from './list-finalizado.component';

describe('ListFinalizadoComponent', () => {
  let component: ListFinalizadoComponent;
  let fixture: ComponentFixture<ListFinalizadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFinalizadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFinalizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
