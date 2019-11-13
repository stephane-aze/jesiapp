import { Component } from '@angular/core';
import { JesiappPage } from './shared/JesiappPage';

@Component({
  selector: 'jesi-root',
  template: `
    <jesi-nav [pageName]="activatedPageName"></jesi-nav>
    <router-outlet (activate)="onRouteActivated($event)"></router-outlet>
  `,
})
export class AppComponent {
  public activatedPageName = 'jesiapp';

  public onRouteActivated(activatedPage: JesiappPage): void {
    this.activatedPageName = activatedPage.pageTitle;
  }
}
