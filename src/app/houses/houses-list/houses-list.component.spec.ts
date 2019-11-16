import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SharedModule } from 'src/app/shared/shared.module';
import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import mockHouse from '../__tests__/mock-house';
import { HousesListComponent } from './houses-list.component';
import { HousesService } from '../houses.service';
import { of } from 'rxjs';
import { HouseThumbnailComponent } from '../house-thumbnail/house-thumbnail.component';

describe('HousesListComponent', () => {
  const testEnv = useComponentTestSetup<HousesListComponent>(HousesListComponent, {
    imports: [HttpClientTestingModule, SharedModule],
    declarations: [HousesListComponent, HouseThumbnailComponent],
  });

  beforeEach(done => {
    testEnv.init(done, () => {
      const service: HousesService = TestBed.get(HousesService);
      jest.spyOn(service, 'listHouses').mockReturnValueOnce(of([mockHouse()]));
    });
  });

  it('should create', () => {
    expect(testEnv.component).toBeTruthy();
  });
});
