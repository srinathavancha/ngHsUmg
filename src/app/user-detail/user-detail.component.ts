import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../user/user';
import { UserService } from '../service/user.service';

@Component({
	selector: 'app-user-detail',
	templateUrl: './user-detail.component.html',
	styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

	user: User;

	constructor(
		//holds information about the route to this instance
		private activeRoute: ActivatedRoute,
		//autowire UserService instance
		private userService: UserService

	) {
		//subscribing and listening to params change
		this.activeRoute.params.subscribe(params => {
			this.getUser(); // reset and set based on new parameter this time
		});
	}

	ngOnInit() {
		this.getUser();
	}

	getUser(): void {
		const userId = +this.activeRoute.snapshot.paramMap.get('id');
		this.userService.getUser(userId)
			.subscribe(user => this.user = user);
	}

}
