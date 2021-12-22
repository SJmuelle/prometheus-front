import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogDecisionComponent } from './form-dialog-decision.component';

describe('FormDialogDecisionComponent', () => {
  let component: FormDialogDecisionComponent;
  let fixture: ComponentFixture<FormDialogDecisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogDecisionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogDecisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
