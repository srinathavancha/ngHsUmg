import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { User } from './user';

@Injectable()
export class UserActionsService {
	
	private actionPostCreate = new Subject < User > ();
	actionPostCreate$ = this.actionPostCreate.asObservable();
	constructor() {}
	// Service user action commands
	postCreate(user: User) {
		this.actionPostCreate.next(user);
	}

}
