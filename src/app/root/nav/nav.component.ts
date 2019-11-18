import { Component, Input } from '@angular/core';
import { User } from 'src/app/user/User';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'jesi-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() public pageName!: string;

  public constructor(private readonly userService: UserService) {}

  public get user() {
    return this.userService.currentUser;
  }
}
