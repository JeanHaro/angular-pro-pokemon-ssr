import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { Pokemon } from '../../pokemons/interfaces/pokemon.interface';

// Servicios
import { PokemonsService } from '../../pokemons/services/pokemons';


@Component({
  selector: 'app-pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.html',
  styles: ``,
})
export default class PokemonPage implements OnInit {
  private pokemonsService = inject(PokemonsService);
  private route = inject(ActivatedRoute);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( !id ) return;

    this.pokemonsService.loadPokemon(id).subscribe(this.pokemon.set)
  }
}
