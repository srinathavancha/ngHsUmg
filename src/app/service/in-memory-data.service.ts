import {InMemoryDbService} from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		/*Collection heroes*/
		const heroes = [
			{
				id: 11,
				name: 'Mr. Nice'
			},
			{
				id: 12,
				name: 'Narco'
			},
			{
				id: 13,
				name: 'Bombasto'
			},
			{
				id: 14,
				name: 'Celeritas'
			},
			{
				id: 15,
				name: 'Magneta'
			},
			{
				id: 16,
				name: 'RubberMan'
			},
			{
				id: 17,
				name: 'Dynama'
			},
			{
				id: 18,
				name: 'Dr IQ'
			},
			{
				id: 19,
				name: 'Magma'
			},
			{
				id: 20,
				name: 'Tornado'
			}
		];
		/*Collection users*/
		const users = [
			{
				id: 11,
				firstName: 'Mr. Nice'
			}
		];
		
		/*Collection departments*/
		const departments = [
			{
				"id": 301,
				"name": "Logistics",
				"displayName": "Logistics"
			},
			{
				"id": 302,
				"name": "hr",
				"displayName": "Human Resource"
			}
		];
		const roles = [
			{
				"id": 401,
				"name": "ROLE_USER",
				"displayName": "Role User"
			},
			{
				"id": 402,
				"name": "ROLE_SUPER_ADMIN",
				"displayName": "Role Super Admin"
			},
			{
				"id": 403,
				"name": "ROLE_ADMIN",
				"displayName": "Role Admin"
			}
		];
		
		
		return {
			heroes, users, departments, roles
		};
	}
}