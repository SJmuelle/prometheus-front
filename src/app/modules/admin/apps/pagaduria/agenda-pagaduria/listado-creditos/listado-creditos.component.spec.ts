import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoCreditosComponent } from './listado-creditos.component';

describe('ListadoCreditosComponent', () => {
  let component: ListadoCreditosComponent;
  let fixture: ComponentFixture<ListadoCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoCreditosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
