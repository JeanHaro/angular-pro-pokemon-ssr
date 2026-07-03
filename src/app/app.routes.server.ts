import { RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

interface PokeApiListResponse {
  results: { name: string }[];
}

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from({ length: TOTAL_PAGES }, (_, i) => ({ page: `${i + 1}` }));
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
      );
      const data: PokeApiListResponse = await response.json();
      return data.results.map((pokemon) => ({ id: pokemon.name }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
