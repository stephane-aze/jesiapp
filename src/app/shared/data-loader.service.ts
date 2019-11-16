import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DataLoaderService<T = any> {
  public stream$: Observable<T>;

  private data: T;
  private loader$: Subject<T>;

  public init(source$: Observable<T>) {
    this.loader$ = new Subject<T>();
    this.stream$ = this.loader$.asObservable();

    source$.subscribe(data => {
      this.data = data;
      this.loader$.next(data);
    });
  }

  public load(data: T): void {
    this.loader$.next(data);
  }

  public transform(project: (data: T) => T): void {
    const transformed = project(this.data);
    this.load(transformed);
  }

  public reset(): void {
    this.loader$.next(this.data);
  }
}
