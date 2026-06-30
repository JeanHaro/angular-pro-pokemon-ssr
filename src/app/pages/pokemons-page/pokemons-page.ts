import { Component, OnInit, signal } from '@angular/core';

// Componentes
import { PokemonList } from "../../pokemons/components/pokemon-list/pokemon-list";
import { PokemonListSkeleton } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton";

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

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 5000);
  }
}
