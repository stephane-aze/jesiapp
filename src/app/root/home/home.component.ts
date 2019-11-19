import { Component } from '@angular/core';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'jesi-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements JesiappPage {
  public pageTitle = 'Accueil';

  public constructor(private readonly userService: UserService) {}

  public get user() {
    return this.userService.currentUser;
  }
}
