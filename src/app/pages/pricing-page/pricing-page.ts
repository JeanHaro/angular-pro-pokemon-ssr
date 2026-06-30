import { isPlatformServer } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
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
  private platform = inject(PLATFORM_ID); // Esto nos da información sobre la plataforma


  ngOnInit(): void {
    // document.title = 'Pricing Page'; es error por el SSR., osea el cliente si sabe de esto, pero el servidor no por el document
    // console.log({ hola: 'mundo' }); // en ssr también se ejecuta en la consola

    console.log(isPlatformServer(this.platform)); // En el server sale true, en el navegador sale false
    // Si no estamos en el servidor
    // El opuesto seria isPlatformBrowser que es si estamos en el navegador
    // Esto no cambia el titulo, solo es para enseñar de como se identifica en que plataforma estamos si queremos cambiar el titulo realmente ddebemos usar el Title que usamos abajo que está comentado, que es el this.title y eso
    if ( !isPlatformServer(this.platform) ) {
      document.title = 'Pricing Page';
    }


    /* this.title.setTitle('Pricing Page');
    this.meta.updateTag({ name: 'description', content: 'Este es mi Pricing Page' });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing Page' });
    this.meta.updateTag({ name: 'keywords', content: 'Hola, Mundo, Jean, Haro, Curso, Angular, PRO' }); */
  }
}

