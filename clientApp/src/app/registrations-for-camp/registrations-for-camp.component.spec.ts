import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationsForCampComponent } from './registrations-for-camp.component';

describe('RegistrationsForCampComponent', () => {
  let component: RegistrationsForCampComponent;
  let fixture: ComponentFixture<RegistrationsForCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationsForCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationsForCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
