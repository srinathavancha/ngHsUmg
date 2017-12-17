import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from '../user/user';
import { UserService } from '../service/user.service';
import { UserActionsService } from '../user/user-actions.service';

@Component({
	selector: 'app-user-create',
	templateUrl: './user-create.component.html',
	styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
	//EventEmitter property is an output property
	/*@Output() onUserSave = new EventEmitter < User > ();*/

	/*parameterised constructor*/
	constructor(
		private userService: UserService,
		private userActionsService: UserActionsService
	) {}
	/*Action Create user*/
	createUser(form: NgForm): void {
		this.userService.addUser(form.value as User)
			.subscribe(user => {
				/*this.users.push(user);*/
				//trigger an event for parent user component
				/*this.onUserSave.emit(user);*/
				//Shared user service performing post create user action
				this.userActionsService.postCreate(user);
			});
	}

}
