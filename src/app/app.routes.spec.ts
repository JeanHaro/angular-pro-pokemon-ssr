import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

// Componente
import AboutPage from './pages/about-page/about-page';

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
    // todo:
  });

  it('should navigate to "/pokemons/page/1" and render PokemonsPageComponent', async () => {
    // todo:
  });

  it('should render PokemonsPageComponent when path is /pokemons/page/:page', async () => {
    // todo:
  });

  it('should redirect to /about when path is unknown', async () => {
    // todo:
  });
});
