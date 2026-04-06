import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyResources } from './company-resources';

describe('CompanyResources', () => {
  let component: CompanyResources;
  let fixture: ComponentFixture<CompanyResources>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyResources],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyResources);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
