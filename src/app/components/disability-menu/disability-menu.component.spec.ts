import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityMenuComponent } from './disability-menu.component';

describe('DisabilityMenuComponent', () => {
  let component: DisabilityMenuComponent;
  let fixture: ComponentFixture<DisabilityMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisabilityMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
