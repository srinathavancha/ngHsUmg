import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from './user';
import { Department } from '../common/department';
import { Role } from '../common/role';

import { UserService } from '../service/user.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	/*Department list*/
	departments: Department[];
	/*roles list*/
	roles: Role[];
	
	/*parameterised constructor*/
	constructor(private router: Router, private userService: UserService) {
	}

	ngOnInit() {
		this.getDepartments();
		this.getRoles();
		/*Load Initial components into respective routes*/
		this.loadInitialComponents();
	}
	/*load create component in outlet outletDynamic*/
	loadInitialComponents() {
		/*
			Loading list component into outlet "userList"
			Loading create component into outlet "userCreate"
		*/
		this.router.navigate([
			'/user', 
			{
				outlets: {
					'outletList':['list'],
					'outletDynamic': ['create']
				}
			}
		]);
	}
	/*Fetch all departments*/
	getDepartments(): void {
		this.userService.getDepartments()
		.subscribe(departments => this.departments = departments);
	}
	/*Fetch all departments*/
	getRoles(): void {
		this.userService.getRoles()
		.subscribe(roles => this.roles = roles);
	}
	/*Delete user*/
	deleteUser(user: User): void {
		/*this.users = this.users.filter(u => u != user);*/
		this.userService.deleteUser(user).subscribe();
	}
	
	
	/*Event received from child component UserCreateComponent*/
	onUserSave(user: User) {
		console.log(user);
	}

}
