import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponentsComponent } from './landing-components.component';

describe('LandingComponentsComponent', () => {
  let component: LandingComponentsComponent;
  let fixture: ComponentFixture<LandingComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
