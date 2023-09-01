import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibranzaComponent } from './libranza.component';

describe('LibranzaComponent', () => {
  let component: LibranzaComponent;
  let fixture: ComponentFixture<LibranzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibranzaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibranzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
