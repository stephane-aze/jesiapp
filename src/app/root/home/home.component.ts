import { Component } from '@angular/core';
import { JesiappPage } from 'src/app/shared/JesiappPage';

@Component({
  selector: 'jesi-home',
  template: `
    <p>home works!</p>
  `,
  styles: [],
})
export class HomeComponent implements JesiappPage {
  public pageTitle = 'Accueil';
}
