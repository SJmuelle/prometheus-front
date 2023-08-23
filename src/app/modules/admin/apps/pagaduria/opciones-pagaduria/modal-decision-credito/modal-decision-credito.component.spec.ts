import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDecisionCreditoComponent } from './modal-decision-credito.component';

describe('ModalDecisionCreditoComponent', () => {
  let component: ModalDecisionCreditoComponent;
  let fixture: ComponentFixture<ModalDecisionCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDecisionCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDecisionCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
