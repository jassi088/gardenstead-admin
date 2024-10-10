import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCodePickerInputComponent } from './country-code-picker-input.component';

describe('CountryCodePickerInputComponent', () => {
  let component: CountryCodePickerInputComponent;
  let fixture: ComponentFixture<CountryCodePickerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryCodePickerInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCodePickerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
