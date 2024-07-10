import { TestBed } from '@angular/core/testing';

import { MessageFormatterService } from './message-formatter.service';

describe('MessageFormatterService', () => {
  let service: MessageFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
