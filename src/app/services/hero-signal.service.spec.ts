import { TestBed } from '@angular/core/testing';

import { HeroSignalService } from './hero-signal.service';

describe('HeroSignalService', () => {
  let service: HeroSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
