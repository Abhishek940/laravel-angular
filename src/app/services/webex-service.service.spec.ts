import { TestBed } from '@angular/core/testing';

import { WebexServiceService } from './webex-service.service';

describe('WebexServiceService', () => {
  let service: WebexServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebexServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
