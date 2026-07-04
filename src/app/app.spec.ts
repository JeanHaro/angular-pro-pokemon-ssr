import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="test-class">
      <a href="test-link">Test link</a>
    </nav>
  `
})
class MockNavbarComponent {}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])]
    })
    .overrideComponent(App, {
      add: {
        imports: [MockNavbarComponent]
      },
      remove: {
        imports: [Navbar]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
