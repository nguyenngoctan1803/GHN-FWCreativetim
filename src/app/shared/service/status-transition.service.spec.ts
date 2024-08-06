import { TestBed } from '@angular/core/testing';

import { StatusTransitionService } from './status-transition.service';

describe('StatusTransitionService', () => {
  let service: StatusTransitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusTransitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
