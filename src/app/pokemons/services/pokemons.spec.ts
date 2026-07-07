import { TestBed } from "@angular/core/testing";
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

// Servicio
import { PokemonsService } from "./pokemons";

// Interfaces
import { SimplePokemon } from "../interfaces/simple-pokemon.interface";
import { PokeAPIResponse } from "../interfaces/pokemon-api.response";

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: null,
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
};

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
} as any;

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

  // Debe cargar una pagina de pokemones
  it('should load a page of pokemons', () => {
    service.loadPage(1).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemons); // Verificamos que recibimos los pokemons del expectedPokemons
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`
    );

    expect(req.request.method).toBe('GET'); // Verificamos que tiene que ser un get
    req.flush(mockPokeApiResponse); // que información queremos meter en esa request que es el mockPokeApiResponse

  });

  // Verificamos que cargamos los pokemones de la pagina 5
  it('should load page 5 of pokemons', () => {
    service.loadPage(5).subscribe( pokemons => {
      expect(pokemons).toEqual(expectedPokemons); // Verificamos que recibimos los pokemons del expectedPokemons
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon?offset=80&limit=20`
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPokeApiResponse);
  });

  // Verificar que el pokemon carga por un id
  it('should load a pokemon by ID', () => {
    const pokemonId = '1';

    service.loadPokemon(pokemonId).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );

    expect(req.request.method).toBe('GET'); // Debe ser un GET
    req.flush(mockPokemon); // Debe ser nuestro mockPokemon
  });

  // Verificar que el pokemon carga por un name
  it('should load a pokemon by Name', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    expect(req.request.method).toBe('GET'); // Debe ser un GET
    req.flush(mockPokemon); // Debe ser nuestro mockPokemon
  });

  // Verificar que los errores funcionan
  it('should catch error if API fails', () => {
    const pokemonName = 'bulbasaur';

    service.loadPokemon(pokemonName).subscribe({
      next: () => {
        throw new Error('Should have failed with 404 error'); // Esto nunca debe de suceder
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not found - Pokemon not found');
      }
    });

    const req = httpMock.expectOne(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    req.flush('404 error', {
      status: 404,
      statusText: 'Not found - Pokemon not found'
    }); // Debe dar un error
  });
});
