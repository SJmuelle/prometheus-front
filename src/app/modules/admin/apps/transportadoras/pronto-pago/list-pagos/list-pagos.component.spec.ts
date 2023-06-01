import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPagosComponent } from './list-pagos.component';

describe('ListPagosComponent', () => {
  let component: ListPagosComponent;
  let fixture: ComponentFixture<ListPagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPagosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
