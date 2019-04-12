# WEBS6 Werkcollege week 2 demo: Architecture
In deze demo gaan we de onderwerpen uit het werkcollege behandelen.
We gaan een applicatie maken met providers, verschillende modules en routing.

## Starter
In de starter vind je een applicatie die een lijst van 'superhelden' laat zien. 
Deze gaan we refactoren. 

## Providers
Op dit moment staat er in de het component 'Heroes' een lijst van helden. Deze gaan we verplaatsen naar een provider.

1. Open _/architecture/src/app/heroes/heroes.component.ts
2. Maak hier een nieuwe provider aan met de naam heroes.provider.ts

```javascript
    import { Injectable } from '@angular/core';

    @Injectable()
    export class HeroProvider {

    }
```
3. Maak in deze provider een lijst van helden en een methode om ze op te halen

```javascript
    private _heroes: Hero[];

    constructor(){
        this._heroes = [];
        this._heroes[0] = new Hero(1, "Bedmen");
        this._heroes[1] = new Hero(2, "Wonden woman");
        this._heroes[2] = new Hero(3, "Flesje");
        this._heroes[3] = new Hero(4, "Supermarktman");
        this._heroes[4] = new Hero(5, "Green Lantaarnpaal");
    }
    
    public getHeroes(){
        return this._heroes;
    }
```
4. Om de provider te kunnen gebruiken moet deze bekend zijn bij een module. Bijvoorbeeld de app.module

```javascript
  providers: [HeroProvider],
```
5. Als laatste stap kunnen we de provider injecteren en hergebruiken in het component.
```javascript
  constructor(private heroProvider: HeroProvider){
      this.heroes = this.heroProvider.getHeroes();
  }
```

### Modules
Je begint te merken dat we nu van alles aan het doen zijn met onze heroes. Het kan makkelijk zijn om een set van componenten en providers in een module te bundelen. 

1. Maak een nieuwe module met de naam HeroesModule
```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  providers: [],
})
export class HeroesModule { }
```
2. Plaats alle providers en componenten in deze module i.p.v de app.module. Vergeet je componenten hier ook niet te exporteren. Anders mogen andere modules er geen gebruik van maken!
```javascript
  declarations: [HeroesComponent, HeroDetailsComponent],
  imports: [
    BrowserModule
  ],
  providers: [HeroProvider],
  exports: [HeroesComponent, HeroDetailsComponent]
```
3. Gebruik deze module in de app.module!
```javascript
    @NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HeroesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
    })
    export class AppModule { }
```
## Observables

We kunnen onze provider nog mooier maken. Dit kunnen we doen door i.p.v een lijst terug te geven gebruik te gaan maken van een Observable. Om deze observable te maken gebruiken we een BehaviorSubject. 

1. Importeer de BehaviorSubject uit de ReactiveX library van JavaScript.

```javascript
import { BehaviorSubject } from "rxjs/BehaviorSubject";
```

2. Maak een property op je provider met de naam Heroes van het type BehaviorSubject. Deze gaan we terug geven als Observable i.p.v onze array. Vergeet ook het type in je component nu niet aan te passen naar een observable!

```javascript
    constructor(){
        this._heroes = [];
        ...
        this.Heroes = new BehaviorSubject(this._heroes);
    }

    public Heroes: BehaviorSubject<Hero[]>;

    private _heroes: Hero[];
    
    public getHeroes(){
        return this.Heroes.asObservable();
    }
```
3. Nu moeten we nog 1 belangrijk ding aanpassen voordat het werkt. Onze heroes is nu geen platte lijst meer maar een Observable. Om deze goed te kunnen laten zien in onze heroes template moeten we gebruik gaan maken van de async pipe.

```html
  <li *ngFor="let hero of heroes | async" (click)="goTo(hero)">
```


<!-- ## Routing
We willen ook graag naar 1 specifieke hero kunnen navigeren. Dit gaan we meteen goed aanpakken zodat links de lijst in beeld blijft, maar we wel echt naar de hero toe navigeren. Hiervoor zijn wel wat wijzigingen nodig. 

1. Maak een nieuw component die de details van 1 held laat zien met de naam HeroComponent. Zet dit component netjes in de folder Heroes en voeg hem toe aan je heroes.module!

```javascript
export class HeroDetailsComponent implements OnInit {

  public Hero: Hero;

  constructor() { }

  ngOnInit() {
  }

}
```
2. Hier heb je alvast een voorbeeld template!
```html
<div *ngIf="hero">
  <h2>{{hero.name}} ({{hero.id}})</h2>
  <img width="300px" src="https://battletime.herokuapp.com/images/hero_{{hero.id}}.png">
</div>
```

3. 
```javascript
```


```javascript
```


```javascript
``` -->
