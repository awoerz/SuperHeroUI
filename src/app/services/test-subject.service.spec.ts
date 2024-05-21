import { TestBed } from '@angular/core/testing';

import { TestSubjectService } from './test-subject.service';

describe('TestSubjectService', () => {
  let service: TestSubjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestSubjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
