import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsProfilesComponent } from './teams-profiles.component';

describe('TeamsProfilesComponent', () => {
  let component: TeamsProfilesComponent;
  let fixture: ComponentFixture<TeamsProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
