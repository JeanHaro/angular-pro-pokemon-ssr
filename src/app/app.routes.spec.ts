import { Location } from '@angular/common';
import { routes } from './app.routes';
import { Router } from '@angular/router';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    // todo:
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBe(6);
  });

  it('should contain all defined routes', () => {
    // todo:
  });

  it('should render AboutPageComponent when path is /about', async () => {
    // todo:
  });

  it('should navigate to "/about" and render AboutPageComponent', async () => {
    // todo:
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
