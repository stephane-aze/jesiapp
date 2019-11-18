import { Component } from '@angular/core';
import { JesiappPage } from './shared/JesiappPage';

@Component({
  selector: 'jesi-root',
  template: `
    <div class="app-container">
      <jesi-nav [pageName]="activatedPageName"></jesi-nav>
      <router-outlet (activate)="onRouteActivated($event)"></router-outlet>
    </div>
  `,
  styles: [
    `
      .app-container {
        max-width: 900px;
        margin: auto;
      }
    `,
  ],
})
export class AppComponent {
  public activatedPageName = 'jesiapp';

  public onRouteActivated(activatedPage: JesiappPage): void {
    this.activatedPageName = activatedPage.pageTitle;
  }
}
