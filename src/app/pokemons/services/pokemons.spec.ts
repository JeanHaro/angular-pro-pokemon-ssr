import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

// Servicio
import { PokemonsService } from "./pokemons";

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting()]
    });
    service = TestBed.inject(PokemonsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of pokemons', () => {
    // todo:
  });

  it('should load page 5 of pokemons', () => {
    // todo:
  });

  it('should load a pokemon by ID', () => {
    // todo:
  });

  it('should load a pokemon by Name', () => {
    // todo:
  });

  it('should catch error if API fails', () => {
    // todo:
  });
});
