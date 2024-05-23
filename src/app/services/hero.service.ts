import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(private _http: HttpClient) { }

  url = 'https://localhost:7168/';

  getHeroes(): Observable<Hero[]> {
    return this._http.get<Hero[]>(this.url + 'api/SuperHero').pipe(
      catchError(this.handleError<Hero[]>('getHeroes'))
    );
  }
  
  getHero(id: number): Observable<Hero> {
    return this._http.get<Hero>(this.url + `api/SuperHero/${id}`).pipe(
      catchError(this.handleError<Hero>('getHero'))
    )
  }

  addHero(newHero: Hero): void {
  this._http.post<Hero>(this.url + 'api/SuperHero', newHero)
    .pipe(
      catchError(this.handleError<Hero>('addHero'))
    )
    .subscribe(
      (hero) => console.log(`Posted ${hero}`)
    )
  }

  updateHero(hero: Hero): void {
    this._http.put(this.url + 'api/SuperHero', hero)
      .pipe(
        catchError(this.handleError<Hero>('updateHero'))
      )
      .subscribe(
        (hero) => console.log(`Updated ${hero}`)
      )
  }

  deleteHero(id: number): void {
    this._http.delete(this.url + `api/SuperHero/${id}`)
      .pipe(
        catchError(this.handleError<Hero>('deleteHero'))
      )
      .subscribe(
        (id) => console.log(`Hero with id ${id} has been deleted.`)
      )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(result)
      return of(result as T);
    };
  }
}