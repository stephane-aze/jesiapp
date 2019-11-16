import { TestBed, fakeAsync } from '@angular/core/testing';

import { DataLoaderService } from '../data-loader.service';
import { from, EMPTY, of } from 'rxjs';
import { reduce } from 'rxjs/operators';

describe('DataLoaderService', () => {
  let service: DataLoaderService<string>;

  beforeEach(() => TestBed.configureTestingModule({ providers: [DataLoaderService] }));
  beforeEach(() => {
    service = TestBed.get(DataLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init()', () => {
    test('instatiates data stream', () => {
      expect(service.stream$).toBeFalsy();

      service.init(EMPTY);

      expect(service.stream$).toBeTruthy();
    });

    test('emits all values from provided observable', fakeAsync(() => {
      const mockData = ['foo', 'bar', 'baz'];
      service.init(from(mockData));

      service.stream$
        .pipe(
          reduce<string>((acc, value) => {
            return acc.concat(value);
          }, [] as string[]),
        )
        .subscribe(values => {
          expect(values).toMatchObject(mockData);
        });
    }));
  });

  describe('load', () => {
    test('emits the given data in its stream', fakeAsync(() => {
      service.init(of('foo'));
      service.load('bar');

      service.stream$.subscribe(value => {
        expect(value).toBe('bar');
      });
    }));
  });

  describe('transform', () => {
    test('emits the initially given data in its stream, transformed by a callback function', fakeAsync(() => {
      service.init(of('foo'));
      service.transform(value => value.toUpperCase());

      service.stream$.subscribe(value => {
        expect(value).toBe('FOO');
      });
    }));
  });

  describe('reset', () => {
    test('emits the initially given data in its stream', fakeAsync(() => {
      service.init(of('foo'));
      service.reset();

      service.stream$.subscribe(value => {
        expect(value).toBe('foo');
      });
    }));

    test('emits the initially given data in its stream ignoring the later loaded data', fakeAsync(() => {
      service.init(of('foo'));
      service.load('bar');
      service.reset();

      service.stream$.subscribe(value => {
        expect(value).toBe('foo');
      });
    }));
  });
});
