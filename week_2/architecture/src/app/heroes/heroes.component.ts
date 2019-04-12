import { Component, OnInit } from '@angular/core';
import { Hero } from './Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: Hero[];

  constructor(){
      this.heroes = [];
      this.heroes[0] = new Hero(1, "Bedmen");
      this.heroes[1] = new Hero(2, "Wonden woman");
      this.heroes[2] = new Hero(3, "Flesje");
      this.heroes[3] = new Hero(4, "Supermarktman");
      this.heroes[4] = new Hero(5, "Green Lantaarnpaal");
  }

  ngOnInit() {
  }

}
