import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, RouterLink } from "@angular/router";
import { By } from "@angular/platform-browser";

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

  // Verificamos que recibe el input
  it('should have the SimplePokemon signal input', () => {
    expect(component.pokemon()).toBe(mockPokemon);
  });

  // Verificamos que tenga la misma url
  it('should compute the correct pokemon image URL', () => {
    const expectedUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`

    expect(component.pokemonImage()).toBe(expectedUrl);
  });

  // Verificamos que el nombre y la imagen rendericen correctamente
  it('should render pokemon name and image correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    const nameElement = compiled.querySelector('h2');
    const imgElement = compiled.querySelector('img');

    expect(nameElement?.textContent.trim()).toBe(mockPokemon.name);
    expect(imgElement?.src).toBe(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${mockPokemon.id}.png`);
    expect(imgElement?.alt).toBe(mockPokemon.name);
  });

  // Debería tener correctamente el routeLink
  it('should have the correct routeLink configuration', () => {
    const debugElement = fixture.debugElement.query(
      By.directive(RouterLink)
    );

    const routerLinkInstance = debugElement.injector.get(RouterLink);

    const expectedUrl = `/pokemons/${mockPokemon.name}`;

    expect(routerLinkInstance.urlTree?.toString()).toBe(expectedUrl);
  });
});
