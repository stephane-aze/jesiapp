import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockHouse from '../../__tests__/mock-house';
import { HousesListComponent } from '../houses-list.component';
import { HousesService } from '../../houses.service';
import { of } from 'rxjs';
import { HouseThumbnailComponent } from '../../house-thumbnail/house-thumbnail.component';
import { House } from '../../House';
import { Router } from '@angular/router';

describe('HousesListComponent', () => {
  const testEnv = useComponentTestSetup<HousesListComponent>(HousesListComponent, {
    imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
    declarations: [HousesListComponent, HouseThumbnailComponent],
  });

  beforeEach(done => {
    testEnv.init(done, () => {
      const service: HousesService = TestBed.get(HousesService);
      const mockHouses = of([mockHouse()]);

      expect(testEnv.component.houses$).toBeFalsy();

      jest.spyOn(service, 'listHouses').mockReturnValueOnce(mockHouses);
    });
  });

  it('should create', () => {
    expect(testEnv.component).toBeTruthy();
  });

  test('when inits, calls the housesService to fetch data', fakeAsync(() => {
    const service: HousesService = TestBed.get(HousesService);
    expect(service.listHouses).toHaveBeenCalledTimes(1);

    testEnv.component.houses$.subscribe(data => {
      data.forEach(house => {
        expect(house).toBeInstanceOf(House);
      });
    });
  }));

  /* tslint:disable no-string-literal */
  test('uses router to open details', () => {
    const router = TestBed.get(Router);
    jest.spyOn(router, 'navigateByUrl').mockImplementationOnce(() => {});

    testEnv.component['openDetails'](1234);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/houses/1234');
  });
  /* tslint:enable no-string-literal */
});
