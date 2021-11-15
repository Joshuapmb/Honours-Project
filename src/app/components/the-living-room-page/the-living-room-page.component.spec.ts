import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheLivingRoomPageComponent } from './the-living-room-page.component';

describe('TheLivingRoomPageComponent', () => {
  let component: TheLivingRoomPageComponent;
  let fixture: ComponentFixture<TheLivingRoomPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheLivingRoomPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheLivingRoomPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
