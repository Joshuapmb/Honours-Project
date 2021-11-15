import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheOfficePageComponent } from './the-office-page.component';

describe('TheOfficePageComponent', () => {
  let component: TheOfficePageComponent;
  let fixture: ComponentFixture<TheOfficePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TheOfficePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TheOfficePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
