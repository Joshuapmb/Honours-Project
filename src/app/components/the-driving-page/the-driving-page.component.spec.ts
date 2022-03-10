import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheDrivingPageComponent } from './the-driving-page.component';

describe('TheDrivingPageComponent', () => {
  let component: TheDrivingPageComponent;
  let fixture: ComponentFixture<TheDrivingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheDrivingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheDrivingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
