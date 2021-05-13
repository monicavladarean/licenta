import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampsListComponent } from './camps-list.component';

describe('CampsListComponent', () => {
  let component: CampsListComponent;
  let fixture: ComponentFixture<CampsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
