import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticasAgendasComponent } from './politicas-agendas.component';

describe('PoliticasAgendasComponent', () => {
  let component: PoliticasAgendasComponent;
  let fixture: ComponentFixture<PoliticasAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasAgendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
