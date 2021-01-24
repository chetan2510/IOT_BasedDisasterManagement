import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescuerComponent } from './rescuer.component';

describe('RescuerComponent', () => {
  let component: RescuerComponent;
  let fixture: ComponentFixture<RescuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
