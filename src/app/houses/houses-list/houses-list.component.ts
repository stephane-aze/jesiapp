import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { JesiappPage } from 'src/app/shared/JesiappPage';
import { HousesService } from '../houses.service';
import { House } from '../House';
import { Router } from '@angular/router';

@Component({
  templateUrl: './houses-list.component.html',
  styleUrls: ['./houses-list.component.scss'],
})

export class HousesListComponent implements OnInit, JesiappPage {
  public readonly pageTitle = 'Houses list';

  public houses$!: Observable<House[]>;

  public constructor(private readonly housesService: HousesService,private router: Router) {}

  public ngOnInit() {
    this.loadHouses();
  }

  private loadHouses() {
    this.houses$ = this.housesService.listHouses();
  }
  public openDetails(HousesId:number){
    this.router.navigateByUrl("/houses/"+HousesId);
  }
}
