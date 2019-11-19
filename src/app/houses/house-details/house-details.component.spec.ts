import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockHouse from '../__tests__/mock-house';
import { SharedModule } from 'src/app/shared/shared.module';
import { CharactersModule } from 'src/app/characters/characters.module';
import { CharactersService } from 'src/app/characters/characters.service';
import { HouseDetailsComponent } from './house-details.component';
import { HousesService } from '../houses.service';
import mockCharacter from 'src/app/characters/__tests__/mock-character';
import { House } from '../House';

describe('HouseDetailsComponent', () => {
  const testEnv = useComponentTestSetup<HouseDetailsComponent>(HouseDetailsComponent, {
    imports: [SharedModule, CharactersModule, RouterTestingModule],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { params: { id: 1234 } },
          params: of({ id: 1234 }),
        },
      },
      {
        provide: HousesService,
        useValue: {
          getHouse: () => of(mockHouse()),
        },
      },
      {
        provide: CharactersService,
        useValue: {
          listHouseCharacters: () => of([mockCharacter()]),
        },
      },
    ],
  });

  beforeEach(testEnv.init);

  /* tslint:disable no-string-literal */
  describe('class', () => {
    it('should create', () => {
      expect(testEnv.component).toBeTruthy();
    });

    test('should have a pageTitle property', () => {
      expect(testEnv.component['pageTitle']).toBeTruthy();
      expect(typeof testEnv.component['pageTitle']).toBe('string');
    });

    test('calls the houses service to fetch a single house on init', () => {
      const housesService: HousesService = TestBed.get(HousesService);

      testEnv.setup(() => {
        jest.spyOn(housesService, 'getHouse');
      });

      expect(housesService.getHouse).toHaveBeenCalledTimes(1);
      expect(housesService.getHouse).toHaveBeenCalledWith(1234);
    });

    test('calls the characters service to fetch a list of characters on init', () => {
      const charactersService: CharactersService = TestBed.get(CharactersService);
      testEnv.setup(() => {
        jest.spyOn(charactersService, 'listHouseCharacters');
      });

      expect(charactersService.listHouseCharacters).toHaveBeenCalledTimes(1);
      expect(charactersService.listHouseCharacters).toHaveBeenCalledWith(1234);
    });
  });

  describe('template', () => {
    let house: House;

    beforeEach(() => {
      house = mockHouse();
    });

    test('displays a button to route back to the /houses page', () => {
      const button = testEnv.getDebugByTestId('back-button').query(By.css('jesi-button'));
      expect(button).toBeTruthy();
      expect(button.attributes['routerLink']).toBeTruthy();
      expect(button.attributes['routerLink']).toBe('/houses');
    });

    test('uses the imagePath of the house to display an img', () => {
      const img: HTMLImageElement = testEnv.element.querySelector('main aside img');
      expect(img).toBeTruthy();
      expect(img.src).toBe(house.imagePath);
    });

    test('uses the coat of arms of the house as an alternative value for the image', () => {
      const img: HTMLImageElement = testEnv.element.querySelector('main aside img');
      expect(img).toBeTruthy();
      expect(img.alt).toBe(house.coatOfArms);
    });

    test('displays the house name in a h2', () => {
      const h2 = testEnv.element.querySelector('main h2');
      expect(h2).toBeTruthy();
      expect(h2.textContent).toBe(house.name);
    });

    test('displays the region and seat of the house in the same h3', () => {
      const h3 = testEnv.element.querySelector('main h3');
      expect(h3).toBeTruthy();
      expect(testEnv.element.querySelector('main h3').textContent).toBe(`${house.region} - ${house.seat}`);
    });

    test('displays the words in the correct data element, below its title', () => {
      const wordsDt = testEnv.element.querySelectorAll('main dl dt').item(0);
      const wordsDd = testEnv.element.querySelectorAll('main dl dd').item(0);

      expect(wordsDt).toBeTruthy();
      expect(wordsDt.textContent).toBe('Words');
      expect(wordsDd).toBeTruthy();
      expect(wordsDd.textContent).toBe(house.words);
    });

    test('does not display the words value dd if no words is provided', () => {
      testEnv.setup(() => {
        const noWordsHouse = mockHouse({ words: '' });
        const housesService: HousesService = TestBed.get(HousesService);
        jest.spyOn(housesService, 'getHouse').mockReturnValue(of(noWordsHouse));
      });

      const dds = testEnv.element.querySelectorAll('main dl dd');

      expect(dds.length).toBe(1);
      expect(dds.item(0).textContent).toBe(house.coatOfArms);
    });

    test('does not display the words title dt if no words is provided', () => {
      testEnv.setup(() => {
        const noWordsHouse = mockHouse({ words: '' });
        const housesService: HousesService = TestBed.get(HousesService);
        jest.spyOn(housesService, 'getHouse').mockReturnValue(of(noWordsHouse));
      });

      const dts = testEnv.element.querySelectorAll('main dl dt');

      expect(dts.length).toBe(1);
      expect(dts.item(0).textContent).toBe('Coat of arms');
    });

    test('displays the coat of arms description in the correct data element, below its title', () => {
      const coatDt = testEnv.element.querySelectorAll('main dl dt').item(1);
      const coatDd = testEnv.element.querySelectorAll('main dl dd').item(1);

      expect(coatDt).toBeTruthy();
      expect(coatDt.textContent).toBe('Coat of arms');
      expect(coatDd).toBeTruthy();
      expect(coatDd.textContent).toBe(house.coatOfArms);
    });

    test('does not display the characters section element if no characters retrieved', () => {
      testEnv.setup(() => {
        const characters = null;
        const charactersService: CharactersService = TestBed.get(CharactersService);
        jest.spyOn(charactersService, 'listHouseCharacters').mockReturnValue(of(characters));
      });

      expect(testEnv.element.querySelector('section')).toBeFalsy();
    });

    test('displays a jesi-character-card if a character is fetched from the characters service', () => {
      expect(testEnv.element.querySelector('jesi-character-card')).toBeTruthy();
    });

    test('displays as many jesi-character-card as there are characters in the list fetched from the service', () => {
      testEnv.setup(() => {
        const characters = [mockCharacter({ id: 1 }), mockCharacter({ id: 2 }), mockCharacter({ id: 3 })];
        const charactersService: CharactersService = TestBed.get(CharactersService);
        jest.spyOn(charactersService, 'listHouseCharacters').mockReturnValue(of(characters));
      });

      expect(testEnv.element.querySelectorAll('jesi-character-card').length).toBe(3);
    });
  });
  /* tslint:enable no-string-literal */
});
