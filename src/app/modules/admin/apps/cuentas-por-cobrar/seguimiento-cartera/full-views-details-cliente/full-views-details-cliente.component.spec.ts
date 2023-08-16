import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewsDetailsClienteComponent } from './full-views-details-cliente.component';

describe('FullViewsDetailsClienteComponent', () => {
  let component: FullViewsDetailsClienteComponent;
  let fixture: ComponentFixture<FullViewsDetailsClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullViewsDetailsClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullViewsDetailsClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
