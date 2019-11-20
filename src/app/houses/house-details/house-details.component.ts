import { Component, OnInit } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { House } from '../House';
import { HousesService } from '../houses.service';
import { Character } from '../../characters/Character';
import { CharactersService } from '../../characters/characters.service';

@Component({
  templateUrl: './house-details.component.html',
  styleUrls: ['./house-details.component.scss'],
})
export class HouseDetailsComponent implements OnInit {
  public house$!: Observable<House>;
  
  public characters$!: Observable<Character[]>;

  public constructor(private route: ActivatedRoute, private houses:HousesService, private characters:CharactersService) {}

  public ngOnInit(): void {
    const { id } = this.route.snapshot.params;
    this.house$=this.houses.getHouse(id);
    this.characters$=this.characters.listHouseCharacters(id);
  }

}
