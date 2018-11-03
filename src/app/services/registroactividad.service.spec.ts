import { TestBed, inject } from '@angular/core/testing';

import { RegistroactividadService } from './registroactividad.service';

describe('RegistroactividadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegistroactividadService]
    });
  });

  it('should be created', inject([RegistroactividadService], (service: RegistroactividadService) => {
    expect(service).toBeTruthy();
  }));
});
