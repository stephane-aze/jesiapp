import { TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockHouse from '../../__tests__/mock-house';
import { HousesListComponent } from '../houses-list.component';
import { HousesService } from '../../houses.service';
import { of, EMPTY } from 'rxjs';
import { HouseThumbnailComponent } from '../../house-thumbnail/house-thumbnail.component';
import cases from 'jest-in-case';

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
    expect(testEnv.element).toBeTruthy();
  });

  test('when inits, calls the housesService to fetch data', fakeAsync(() => {
    testEnv.setup(() => {
      const mockHouses = EMPTY;
      const service: HousesService = TestBed.get(HousesService);
      jest.spyOn(service, 'listHouses').mockReturnValueOnce(mockHouses);
    });

    expect(testEnv.element.querySelector('jesi-loader')).toBeTruthy();
    expect(testEnv.getElementByTestId('display-houses')).toBeFalsy();
  }));

  test('when data stream has emitted values, then displays associated section', fakeAsync(() => {
    testEnv.setup(() => {
      const mockHouses = of([]);
      const service: HousesService = TestBed.get(HousesService);
      jest.spyOn(service, 'listHouses').mockReturnValueOnce(mockHouses);
    });

    testEnv.component.houses$.subscribe(() => {
      testEnv.fixture.detectChanges();

      expect(testEnv.element.querySelector('jesi-loader')).toBeFalsy();
      expect(testEnv.getElementByTestId('display-houses')).toBeTruthy();
    });
  }));

  cases(
    'when data stream has emitted a list of elements',
    ({ given: { list }, then: { displayedCount } }, done) => {
      testEnv.component.houses$ = of(list);

      testEnv.component.houses$.subscribe(() => {
        testEnv.fixture.detectChanges();

        expect(testEnv.element.querySelectorAll('jesi-house-thumbnail').length).toBe(displayedCount);
        done();
      });
    },
    {
      empty: {
        given: { list: [] },
        then: { displayedCount: 0 },
      },
      'one element': {
        given: { list: [mockHouse()] },
        then: { displayedCount: 1 },
      },
      'several elements': {
        given: { list: [mockHouse({ id: 1 }), mockHouse({ id: 2 }), mockHouse({ id: 3 })] },
        then: { displayedCount: 3 },
      },
    },
  );

  /* tslint:disable no-string-literal */
  test('should open the house details on click', fakeAsync(() => {
    testEnv.setup(() => {
      const mockHouses = of([mockHouse({ id: 1234 })]);
      const service: HousesService = TestBed.get(HousesService);
      jest.spyOn(service, 'listHouses').mockReturnValueOnce(mockHouses);
    });

    testEnv.component.houses$.subscribe(() => {
      testEnv.fixture.detectChanges();

      testEnv.component['openDetails'] = jest.fn();
      const thumbnail = testEnv.element.querySelector('jesi-house-thumbnail');

      thumbnail.dispatchEvent(new Event('click'));
      expect(testEnv.component['openDetails']).toHaveBeenCalledTimes(1);
      expect(testEnv.component['openDetails']).toHaveBeenCalledWith(1234);
    });
  }));
  /* tslint:enable no-string-literal */
});
