import { TestBed } from '@angular/core/testing';

import { EventsService } from './events.service';

describe('EventsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventsService = TestBed.get(EventsService);
    expect(service).toBeTruthy();
  });
});
