import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestSubjectService {
  public stateSubject$ = new BehaviorSubject<string>('Initial State From Subject');

  constructor() { }

  public init(): void {
    this.stateSubject$.next('Just testing this guy.')
  }

  public getStateSubject(): Observable<string> {
    return this.stateSubject$;
  }

  public updateStateSubject(val: string): void {
    this.stateSubject$.next(val)
  }

}
