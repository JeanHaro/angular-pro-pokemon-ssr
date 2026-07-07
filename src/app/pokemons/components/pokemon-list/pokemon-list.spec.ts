import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

// Componentes
import { PokemonList } from "./pokemon-list";

// Interfaces
import { SimplePokemon } from "../../interfaces/simple-pokemon.interface";

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' }
]

describe('PokemonList', () => {
  let component: PokemonList;
  let fixture: ComponentFixture<PokemonList>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonList],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonList);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // Le asignamos el valor inicial antes del primer ciclo de vida
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  // Verificamos que reciba la lista
  it('should render the pokemon list', () => {
    fixture.componentRef.setInput('pokemons', mockPokemons);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const pokemonCards = compiled.querySelectorAll('pokemon-card');

    // Verificamos que tenga 2 pokemones
    expect(pokemonCards.length).toBe(2);
  });

  it('should render "No hay pokemons" when list is empty', () => {
    fixture.componentRef.setInput('pokemons', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('div.col-span-5');

    expect(message?.textContent.trim()).toBe('No hay pokemons')
  })
});
