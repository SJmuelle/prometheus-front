import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDialogoChecklistComponent } from './form-dialogo-checklist.component';

describe('FormDialogoChecklistComponent', () => {
  let component: FormDialogoChecklistComponent;
  let fixture: ComponentFixture<FormDialogoChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDialogoChecklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDialogoChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
