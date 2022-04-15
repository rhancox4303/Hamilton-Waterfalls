import { TestBed } from '@angular/core/testing';

import { WaterfallsService } from './waterfalls.service';

describe('WaterfallsService', () => {
  let service: WaterfallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterfallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
