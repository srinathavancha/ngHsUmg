import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators/catchError';

import { User } from '../user/user';
import { Department } from '../common/department';
import { Role } from '../common/role';

import { MessageService } from './message.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable()
export class UserService {

	private userUrl = 'api/users';
	private departmentUrl = 'api/departments';
	private roleUrl = 'api/roles';

	constructor(
		private http: HttpClient,
		private messageService: MessageService
	) {}

	//get departments
	getDepartments(): Observable<Department[]> {
		return this.http.get<Department[]>(this.departmentUrl)
		.pipe(
			tap(departments => this.log(`UserService::Fetched departments`)),
			catchError(this.handleError('UserService::getDepartments', []))
		)
	}
	//get roles
	getRoles(): Observable<Role[]> {
		return this.http.get<Role[]>(this.roleUrl)
		.pipe(
			tap(roles => this.log(`UserService::Fetched Roles`)),
			catchError(this.handleError('UserService::getRoles', []))
		)
	}
	
	//get users list
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(this.userUrl)
		.pipe(
			tap(users => this.log(`UserService::Fetched users`)),
			catchError(this.handleError('UserService::getUsers', []))
		);
	}

	getUser(id: number): Observable<User> {
		const url = `${this.userUrl}/${id}`;
		return this.http.get<User>(url)
		.pipe(
			tap(_ => this.log(`UserService::Fetch user id: ${id}`)),
			catchError(this.handleError<User>(`UserService::getUser::id=${id}`))
		);
	}
	
	updateUser(user: User): Observable<User> {
		return this.http.put(this.userUrl, user, httpOptions)
		.pipe(
			tap(_ => this.log(`UserService::Updated user id: ${user.id}`)),
			catchError(this.handleError<any>('UserService::Update user successful.'))
		);
	}

	addUser(user: User): Observable<User> {
		return this.http.post(this.userUrl, user, httpOptions)
		.pipe(
			tap((user: User) => this.log(`UserService::Create user id: ${user.id}`)),
			catchError(this.handleError<User>('Create user successful f'))
		);
	}

	deleteUser(user: User | number): Observable<User> {
		const id = typeof user === 'number' ? user : user.id;
		const url = `${this.userUrl}/${id}`;
		return this.http.delete(this.userUrl, httpOptions)
		.pipe(
			tap(_=> this.log(`UserService::Delete successful for id=${id}`)),
			catchError(this.handleError<User>('Delete successful'))
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
	
	/** Log a UserService message with the MessageService */
	private log(message: string) {
		this.messageService.add('User Service: '+message);
	}
}
