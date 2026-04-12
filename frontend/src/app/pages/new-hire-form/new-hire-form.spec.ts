import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHireForm } from './new-hire-form';

describe('NewHireForm', () => {
  let component: NewHireForm;
  let fixture: ComponentFixture<NewHireForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewHireForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewHireForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
