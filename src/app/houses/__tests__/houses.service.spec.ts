import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EMPTY, of } from 'rxjs';

import mockHouseShape from './mock-house-shape';
import { HousesResourceService } from '../data-access';
import { HousesService } from '../houses.service';
import { House } from '../House';

describe('HousesService', () => {
  let service: HousesService;
  let resource: HousesResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.get(HousesService);
    resource = TestBed.get(HousesResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('listHouses()', () => {
    test('when called, then requests data from resource service', fakeAsync(() => {
      jest.spyOn(resource, 'fetchHouses').mockReturnValueOnce(EMPTY);

      service.listHouses();

      expect(resource.fetchHouses).toHaveBeenCalledTimes(1);
    }));

    test('when received data, then returns it as House instances', () => {
      const mockData = mockHouseShape();

      jest.spyOn(resource, 'fetchHouses').mockReturnValueOnce(of([mockData]));

      service.listHouses().subscribe(data => {
        data.forEach(model => {
          expect(model).toBeInstanceOf(House);
        });
      });
    });
  });

  describe('getHouse', () => {
    test('when called with an id, then calls the resource service with the same id', () => {
      jest.spyOn(resource, 'fetchHouse').mockReturnValueOnce(EMPTY);

      service.getHouse(1234);

      expect(resource.fetchHouse).toHaveBeenCalledTimes(1);
      expect(resource.fetchHouse).toHaveBeenCalledWith(1234);
    });

    test('when received data, then returns it as House instances', () => {
      const mockData = mockHouseShape();

      jest.spyOn(resource, 'fetchHouse').mockReturnValueOnce(of(mockData));

      service.getHouse(1234).subscribe(model => {
        expect(model).toBeInstanceOf(House);
      });
    });
  });
});
