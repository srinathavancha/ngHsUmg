import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'; 

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {map, tap} from 'rxjs/operators';
import {catchError} from 'rxjs/operators/catchError';

import {Hero} from '../heroes/hero';
/*import {HEROES} from '../heroes/mock-heroes';*/
import {MessageService} from './message.service';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable()
export class HeroService {	
	
	private heroesUrl = 'api/heroes'; //url to web api

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}	
	
	//with out observable; synchronous
	/*getHeroes(): Hero[] {
		return HEROES;
	}*/

	//with observable; asynchronous
	/*getHeroes(): Observable<Hero[]> {
		this.messageService.add('HeroService: fetched Heroes');
		return of(HEROES);
	}*/
	
	/** GET heroes from the server */
	getHeroes(): Observable<Hero[]> {
		return this.http.get<Hero[]>(this.heroesUrl)
		.pipe(
			tap(heroes => this.log(`fetched heroes`)),
			catchError(this.handleError('getHeroes', []))
		);
	}
	//with static data
	/*getHero(id: number): Observable<Hero> {
		//backticks ( ` ) that define a JavaScript template literal for embedding the id
		this.messageService.add(`HeroService: fetched hero id=${id}`);
		return of(HEROES.find(hero => hero.id == id));
	}*/

	//with observable
	getHero(id: number): Observable<Hero> {
		const url = `${this.heroesUrl}/${id}`;
		return this.http.get<Hero>(url)
		.pipe(
			tap(_ => this.log(`fetched hero id=${id}`)),
			catchError(this.handleError<Hero>(`getHero id=${id}`))
		);
	}
	
	/** PUT: update the hero on the server */
	updateHero(hero: Hero): Observable<any> {
		return this.http
		.put(this.heroesUrl, hero, httpOptions)
		.pipe(
			tap(_ => this.log(`updated Hero: id=${hero.id}`)),
			catchError(this.handleError<any>('UpdatedHero Successfull.'))
		);
	}

	addHero(hero: Hero): Observable<Hero> {
		return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
		.pipe(
			tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
			catchError(this.handleError<Hero>('Add Hero Successfull'))
		);
	}

	deleteHero(hero: Hero | number): Observable<Hero> {
		const id = typeof hero === 'number' ? hero : hero.id;
		const url = `${this.heroesUrl}/${id}`;
		return this.http.delete<Hero>(url, httpOptions)
		.pipe(
			tap(_ => this.log(`Deleted Sucessfull hero id=${id}`)),
			catchError(this.handleError<Hero>('deleted hero'))
		);
	}

	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			 // TODO: send the error to remote logging infrastructure
			  console.error(error); // log to console instead

			  // TODO: better job of transforming error for user consumption
			  this.log(`${operation} failed: ${error.message}`);

			  // Let the app keep running by returning an empty result.
			  return of(result as T);
		};						
    }
	
	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		this.messageService.add('HeroService: '+message);
	}


}
