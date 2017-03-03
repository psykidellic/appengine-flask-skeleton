import { TestBed, inject } from '@angular/core/testing';
import { LanguageServiceService } from './language-service.service';

describe('LanguageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageServiceService]
    });
  });

  it('should ...', inject([LanguageServiceService], (service: LanguageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
