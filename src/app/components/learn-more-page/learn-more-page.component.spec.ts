import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnMorePageComponent } from './learn-more-page.component';

describe('LearnMorePageComponent', () => {
  let component: LearnMorePageComponent;
  let fixture: ComponentFixture<LearnMorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnMorePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnMorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
