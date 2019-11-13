import { Component, Input } from '@angular/core';

@Component({
  selector: 'jesi-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() public pageName!: string;
}
