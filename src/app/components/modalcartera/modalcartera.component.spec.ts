import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcarteraComponent } from './modalcartera.component';

describe('ModalcarteraComponent', () => {
  let component: ModalcarteraComponent;
  let fixture: ComponentFixture<ModalcarteraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalcarteraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcarteraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
