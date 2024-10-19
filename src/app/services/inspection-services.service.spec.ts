import { TestBed } from '@angular/core/testing';

import { InspectionServicesService } from './inspection-services.service';

describe('InspectionServicesService', () => {
  let service: InspectionServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspectionServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
