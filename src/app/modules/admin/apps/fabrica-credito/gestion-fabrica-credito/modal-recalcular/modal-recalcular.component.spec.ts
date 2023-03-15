import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecalcularComponent } from './modal-recalcular.component';

describe('ModalRecalcularComponent', () => {
  let component: ModalRecalcularComponent;
  let fixture: ComponentFixture<ModalRecalcularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecalcularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecalcularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
