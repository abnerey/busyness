import { TestBed, inject } from '@angular/core/testing';

import { BusynessService } from './busyness.service';

describe('BusynessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusynessService]
    });
  });

  it('should be created', inject([BusynessService], (service: BusynessService) => {
    expect(service).toBeTruthy();
  }));
});
