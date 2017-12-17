import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',
		pathMatch: 'full'
	},
	{
		path: 'dashboard',
		component: DashboardComponent
	},
	{
		path: 'heroes',
		component: HeroesComponent
	},
	//parameterized route 
	// colon (:) in the path indicates that :id is a placeholder for a specific id
	/*{
		path: 'detail/:id',
		component: HeroDetailComponent
	},*/
	{
		path: 'user',
		component: UserComponent,
		children: [
			/*{ path: '', redirectTo: 'list', pathMatch: 'full' },*/
      		{ path: 'list', component: UserListComponent, outlet: "outletList" },
      		{ path: 'create', component: UserCreateComponent, outlet: "outletDynamic" },
			{ path: 'detail/:id', component: UserDetailComponent, outlet: "outletDynamic" }
		]
	}
	
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
