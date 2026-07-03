import { RenderMode, ServerRoute } from '@angular/ssr';

const TOTAL_POKEMONS = 151;
const TOTAL_PAGES = 5;

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemons/page/:page',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from(
        { length: TOTAL_PAGES },
        (_, i) => ({
          page: `${i + 1}`,
        })
      );
    },
  },
  {
    path: 'pokemons/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return Array.from(
        { length: TOTAL_POKEMONS },
        (_, i) => ({
          id: `${i + 1}`,
        })
      );
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
