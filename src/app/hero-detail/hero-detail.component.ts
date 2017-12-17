import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../service/hero.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

	@Input() hero: Hero;
	constructor(
		//holds information about the route to this instance
		private route: ActivatedRoute,
		//gets hero data from the remote server 
		private heroService: HeroService,
		private location: Location
	) {}

	ngOnInit(): void {
		this.getHero();
	}

	getHero(): void {
		const id = +this.route.snapshot.paramMap.get('id');
		this.heroService.getHero(id).subscribe(hero => this.hero = hero);
	}

	save(): void {
		this.heroService.updateHero(this.hero)
			.subscribe(() => this.goBack());
	}


	goBack(): void {
		this.location.back();
	}

}
