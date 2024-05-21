import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestSubjectService {
  private stateSubject$ = new BehaviorSubject<string>('');

  constructor() { }

  public init(): void {
    this.stateSubject$.next('Just testing this guy.')
  }

  public getStateSubject(): Observable<string> {
    return this.stateSubject$;
  }

  public updateStateSubject(val: string): void {
    this.stateSubject$.next('test')
  }

}
