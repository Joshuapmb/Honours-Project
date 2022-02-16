import { TestBed } from '@angular/core/testing';

import { ActiveCBDService } from './active-cbd.service';

describe('ActiveCBDService', () => {
  let service: ActiveCBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveCBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
