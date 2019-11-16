import { Component, OnInit } from '@angular/core';
import { JesiappPage } from 'src/app/shared/JesiappPage';
import { Observable } from 'rxjs';
import { House } from '../House';
import { HousesService } from '../houses.service';

@Component({
  selector: 'jesi-houses-list',
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})
export class HousesListComponent implements OnInit, JesiappPage {
  public readonly pageTitle = 'Houses list';

  public houses$!: Observable<House[]>;

  public constructor(private readonly housesService: HousesService) {}

  public ngOnInit() {
    this.loadHouses();
  }

  private loadHouses() {
    this.houses$ = this.housesService.listHouses();
  }
}
