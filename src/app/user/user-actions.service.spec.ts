import { TestBed, inject } from '@angular/core/testing';

import { UserActionsService } from './user-actions.service';

describe('UserActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserActionsService]
    });
  });

  it('should ...', inject([UserActionsService], (service: UserActionsService) => {
    expect(service).toBeTruthy();
  }));
});
