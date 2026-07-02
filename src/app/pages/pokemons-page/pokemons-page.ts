import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    PokemonListSkeleton
],
  templateUrl: './pokemons-page.html',
  styles: ``,
})
export default class PokemonsPage implements OnInit {
  // public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map( params => params.get('page') ?? '1' ),
      map( page => ( isNaN(+page) ? 1 : +page ) ),
      map( page => Math.max(1, page))
    )
  );



  /*  private appRef = inject(ApplicationRef);

  // Estado actual, el $ es para indicar que es un observable
  private $appState = this.appRef.isStable.subscribe( isStable => {
    console.log({ isStable });
  }); */

  ngOnInit(): void {
    console.log(this.currentPage());

    this.loadPokemons();

    /* setTimeout(() => {
      this.isLoading.set(false);
    }, 5000); */
  }

  // Cuando tengamos un observable que estamos suscrito es bueno que usemos ngOnDestroy para destruir esa suscripcion
  /* ngOnDestroy(): void {
    console.log('destroy');
    this.$appState.unsubscribe();
  } */

  public loadPokemons ( page = 0 ) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService.loadPage(pageToLoad)
    .pipe(
      tap( () => this.router.navigate([], { queryParams: { page: pageToLoad } }) ),
      tap( () => this.title.setTitle(`Pokemons SSR - Page ${pageToLoad}`))
    )
    .subscribe({
      next: ( pokemons ) => {
        this.pokemons.set(pokemons);
      }
    })
  }
}
