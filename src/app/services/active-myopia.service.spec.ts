import { TestBed } from '@angular/core/testing';

import { ActiveMyopiaService } from './active-myopia.service';

describe('ActiveMyopiaService', () => {
  let service: ActiveMyopiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveMyopiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
