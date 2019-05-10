import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FoosballComponent } from './foosball.component';

describe('FoosballComponent', () => {
  let component: FoosballComponent;
  let fixture: ComponentFixture<FoosballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoosballComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FoosballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
