import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './service/hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './service/message.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './service/user.service';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserActionsService } from './user/user-actions.service';
@NgModule({
	declarations: [
		AppComponent,
		HeroesComponent,
		HeroDetailComponent,
		MessagesComponent,
		DashboardComponent,
		UserComponent,
		UserDetailComponent,
		UserListComponent,
		UserCreateComponent
  	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		HttpClientModule,
		// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
		// and returns simulated server responses.
		// Remove it when a real server is ready to receive requests.		
		HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, {dataEncapsulation: false}
		),
		AppRoutingModule
	],
	providers: [HeroService, MessageService, UserService, UserActionsService],
	bootstrap: [AppComponent]
})
export class AppModule {}
