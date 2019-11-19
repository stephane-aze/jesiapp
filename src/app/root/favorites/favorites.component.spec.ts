import useComponentTestSetup from 'src/test-setup/use-component-test-setup';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './favorites.component';
import { EntityPreviewComponent } from '../entity-preview/entity-preview.component';

describe('FavoritesComponent', () => {
  const testEnv = useComponentTestSetup<FavoritesComponent>(FavoritesComponent, {
    declarations: [FavoritesComponent, EntityPreviewComponent],
    imports: [SharedModule],
  });

  beforeEach(testEnv.init);

  it('should create', () => {
    expect(testEnv.component).toBeTruthy();
  });
});
