import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { User } from '../user/user';
import { UserService } from '../service/user.service';
import { UserActionsService } from '../user/user-actions.service';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
	/*User list*/
	users: User[];
	subscription: Subscription;
	
	/*parameterised constructor*/
	constructor(
		private router: Router,
		private userService: UserService,
		private userActionsService: UserActionsService
	) {
		this.subscribeActionOnPostCreate();
	}

	ngOnInit() {
		this.getUsers();
	}
	/*Fetch all users*/
	getUsers(): void {
		this.userService.getUsers()
			.subscribe(users => this.users = users);
	}
	
	/*subscribing to action on post save a new User*/
	subscribeActionOnPostCreate(): void {
		this.subscription = this.userActionsService.actionPostCreate$.subscribe(
			user => {
				this.users.push(user);
			}
		);
	}
	
	ngOnDestroy() {
		//prevent memory leak when component destroyed
		this.subscription.unsubscribe();
	}
	
	/*View user details*/
	showDetail(user: User): void {
		this.router.navigate([
			'/user', 
			{
				outlets: {
					'outletDynamic': ['detail', user.id]
				}
			}
		]);
	}
	
	/*View Create user form*/
	createUser(): void {
		this.router.navigate([
			'/user',
			{
				outlets: {
					'outletDynamic': ['create']
				}
			}
		]);
	}

}
