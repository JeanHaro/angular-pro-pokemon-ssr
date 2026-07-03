import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

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
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<Pokemon | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if ( !id ) return;

    this.pokemonsService.loadPokemon(id)
    .pipe(
      tap( ({ name, id }) => {
        const pageTitle = `#${id} - ${name}`;
        const pageDescription = `Página del pokemon ${name}`;

        this.title.setTitle(pageTitle);
        this.meta.updateTag({ property: 'description', content: pageDescription });
        this.meta.updateTag({ property: 'og:title', content: pageTitle });
        this.meta.updateTag({ property: 'og:description', content: pageDescription });
        this.meta.updateTag({ property: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` })
      })
    )
    .subscribe(this.pokemon.set)
  }
}
