import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibranzaPublicaComponent } from './libranza-publica.component';

describe('LibranzaPublicaComponent', () => {
  let component: LibranzaPublicaComponent;
  let fixture: ComponentFixture<LibranzaPublicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibranzaPublicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibranzaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
