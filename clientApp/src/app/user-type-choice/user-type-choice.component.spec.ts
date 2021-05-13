import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTypeChoiceComponent } from './user-type-choice.component';

describe('UserTypeChoiceComponent', () => {
  let component: UserTypeChoiceComponent;
  let fixture: ComponentFixture<UserTypeChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTypeChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTypeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
