import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosComponent } from './listados.component';

describe('ListadosComponent', () => {
  let component: ListadosComponent;
  let fixture: ComponentFixture<ListadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
