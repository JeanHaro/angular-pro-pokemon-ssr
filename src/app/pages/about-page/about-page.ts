import { Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.html',
  styles: ``,
})
export default class AboutPage implements OnInit {
  // Titulo de la pagina
  private title = inject(Title);
  // Meta tags
  private meta = inject(Meta);


  ngOnInit(): void {
    this.title.setTitle('About Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi About Page' });
    this.meta.updateTag({ name: 'og:title', content: 'About Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Jean, Haro, Curso, Angular, PRO' });
  }
}
