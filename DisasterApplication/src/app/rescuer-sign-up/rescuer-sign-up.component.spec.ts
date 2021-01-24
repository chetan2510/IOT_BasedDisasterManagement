import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescuerSignUpComponent } from './rescuer-sign-up.component';

describe('RescuerSignUpComponent', () => {
  let component: RescuerSignUpComponent;
  let fixture: ComponentFixture<RescuerSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescuerSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescuerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
