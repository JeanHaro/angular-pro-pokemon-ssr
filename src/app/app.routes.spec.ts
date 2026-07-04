import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

// Componente
import AboutPage from './pages/about-page/about-page';
import PricingPage from './pages/pricing-page/pricing-page';
import PokemonsPage from './pages/pokemons-page/pokemons-page';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find( (route) => route.path === 'about' )!;

    // Verificamos que exista la ruta del about
    expect(aboutRoute).toBeDefined();

    // Cargamos el componente
    const component = (await aboutRoute.loadComponent!()) as any;

    // Verificamos que el componente que renderizo es el about
    expect(component.default).toBe(AboutPage);
  });

  // Verificamos que al colocar o navegar al slash navegamos al about
  it('should navigate to "/about" when default path is set', async () => {
    await router.navigate(['/']);

    expect(location.path()).toBe('/about');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const pricingRoute = routes.find( (route) => route.path === 'pricing' )!;

    // Verificamos que exista la ruta del pricing
    expect(pricingRoute).toBeDefined();

    // Cargamos el componente
    const component = (await pricingRoute.loadComponent!()) as any;

    // Verificamos que el componente que renderizo es el pricing
    expect(component.default).toBe(PricingPage);
  });

  // Verificamos que navegamos a esa ruta
  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons/page/1']);

    expect(location.path()).toBe('/pokemons/page/1');
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    const route = routes.find( (route) => route.path === 'pokemons/page/:page' )!;

    // Verificamos que exista la ruta del pokemons/page/:page
    expect(route).toBeDefined();

    // Cargamos el componente
    const component = (await route.loadComponent!()) as any;

    // Verificamos que el componente que renderizo pokemons/page/:page
    expect(component.default).toBe(PokemonsPage);
  });

  // Verificamos que cuando no es conocido la ruta manda al about
  it('should redirect to /about when path is unknown', async () => {
    await router.navigate(['/asdasdasd']);

    expect(location.path()).toBe('/about');
  });
});
