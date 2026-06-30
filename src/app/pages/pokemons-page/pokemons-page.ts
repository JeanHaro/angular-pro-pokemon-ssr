import { ApplicationRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';

// Componentes
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";

// Servicios
import { PokemonsService } from '../../pokemons/services/pokemons';

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
  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);

  /*  private appRef = inject(ApplicationRef);

  // Estado actual, el $ es para indicar que es un observable
  private $appState = this.appRef.isStable.subscribe( isStable => {
    console.log({ isStable });
  }); */

  ngOnInit(): void {
    this.loadPokemons();

    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  }

  // Cuando tengamos un observable que estamos suscrito es bueno que usemos ngOnDestroy para destruir esa suscripcion
  /* ngOnDestroy(): void {
    console.log('destroy');
    this.$appState.unsubscribe();
  } */

  public loadPokemons ( page = 0 ) {
    this.pokemonsService.loadPage(page).subscribe({
      next: ( pokemons ) => {
        console.log('On init');
      }
    })
  }
}
