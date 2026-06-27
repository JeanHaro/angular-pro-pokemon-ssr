import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  styles: ``,
})
export default class PricingPage implements OnInit {
  // Titulo de la pagina
  private title = inject(Title);
  // Meta tags
  private meta = inject(Meta);


  ngOnInit(): void {
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Jean, Haro, Curso, Angular, PRO' });
  }
}

