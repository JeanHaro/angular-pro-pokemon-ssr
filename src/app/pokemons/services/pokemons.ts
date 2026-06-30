import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

import { map, Observable, tap } from 'rxjs';

// Interfaces
import { SimplePokemon } from '../interfaces/simple-pokemon.interface';
import { PokeAPIResponse } from '../interfaces/pokemon-api.response';

@Service()
export class PokemonsService {
  private http = inject(HttpClient);

  // page: 1, 2, 3
  public loadPage ( page: number ): Observable<SimplePokemon[]> {
    // Si la pagina no es 0 entonces restamos 1 a la pagina porque el inicio del paginado es 0
    if ( page !== 0 ) {
      --page;
    }

    page = Math.max(0, page);

    return this.http.get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${ page * 20 }&limit=20`).pipe(
      map( (resp) => {
        const simplePokemons: SimplePokemon[] = resp.results.map(
          (pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name
          })
        );

        return simplePokemons;
      }),
      tap( pokemons => console.log({pokemons}) )
    );
  }
}
