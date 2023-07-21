import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoPoliticasComponent } from './historico-politicas.component';

describe('HistoricoPoliticasComponent', () => {
  let component: HistoricoPoliticasComponent;
  let fixture: ComponentFixture<HistoricoPoliticasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoricoPoliticasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
