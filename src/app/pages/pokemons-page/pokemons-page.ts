import {  Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';

// Componentes
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";

// Servicios
import { PokemonsService } from '../../pokemons/services/pokemons';
import { SimplePokemon } from '../../pokemons/interfaces/simple-pokemon.interface';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'pokemons-page',
  imports: [
    PokemonList,
    PokemonListSkeleton,
    RouterLink
],
  templateUrl: './pokemons-page.html',
  styles: ``,
})
export default class PokemonsPage {
  // public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map( params => params['page'] ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page ) ),
      map( page => Math.max(1, page))
    )
  );

  public loadOnPageChange = effect(() => {
    this.loadPokemons(this.currentPage());
  }, {
    allowSignalWrites: true // Permitir esa escritura en esa señal en este efecto
  });

  /*  private appRef = inject(ApplicationRef);

  // Estado actual, el $ es para indicar que es un observable
  private $appState = this.appRef.isStable.subscribe( isStable => {
    console.log({ isStable });
  }); */

  /** ngOnInit(): void {
    // console.log(this.currentPage());

    // this.loadPokemons();

    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);
  } */

  // Cuando tengamos un observable que estamos suscrito es bueno que usemos ngOnDestroy para destruir esa suscripcion
  /* ngOnDestroy(): void {
    console.log('destroy');
    this.$appState.unsubscribe();
  } */

  public loadPokemons ( page = 0 ) {
    this.pokemonsService.loadPage(page)
    .pipe(
      /* tap( () => this.router.navigate([], { queryParams: { page: pageToLoad } }) ), */
      tap( () => this.title.setTitle(`Pokemons SSR - Page ${page}`))
    )
    .subscribe({
      next: ( pokemons ) => {
        this.pokemons.set(pokemons);
      }
    })
  }
}
