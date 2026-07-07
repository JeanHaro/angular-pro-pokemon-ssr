import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

// Componentes
import { PokemonCard } from "./pokemon-card";

// Interfaces
import { SimplePokemon } from "../../interfaces/simple-pokemon.interface";

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur'
}

describe('PokemonCard', () => {
  let component: PokemonCard;
  let fixture: ComponentFixture<PokemonCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonCard],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(PokemonCard);
    component = fixture.componentInstance;

    // Valores de inputs
    fixture.componentRef.setInput('pokemon', mockPokemon);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toBe(mockPokemon);
  });

  it('should compute the correct pokemon image URL', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`

    expect(component.pokemonImage()).toBe(expectedUrl);
  })
});
