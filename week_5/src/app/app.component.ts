import { Component } from '@angular/core';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  public poules: any[] = [];

  constructor(private dragulaService: DragulaService) {

    //add 3 pules
    for(var i = 0; i < 3; i++)
    {
      this.addPoule("Poule " + (i + 1));
    }

    dragulaService.drag.subscribe((value) => {
      //console.log(`drag: ${value[0]}`);
      this.onDrag(value.slice(1));
    });

    dragulaService.drop.subscribe((value) => {
      this.updatePoules();
    });


    dragulaService.over.subscribe((value) => {
      //console.log(`over: ${value[0]}`);
      this.onOver(value.slice(1));
    });
    
    dragulaService.out.subscribe((value) => {
      //console.log(`out: ${value[0]}`);
      this.onOut(value.slice(1));
    });
  }

  private playercounter = 0;

  private updatePoules(){
    //wow much magic
    this.poules = [...this.poules];
  }

  public addPoule(name: string){

    var players = [];
    //create items
    for(var i = 0; i < 5; i++)
    {
        players.push({name: "Player " + this.playercounter});
        this.playercounter++;
    }

    this.poules.push({
      name: name,
      players: players
    });
  }

  private onDrag(args) {
    let [e, el] = args;
    // do something
  }
  
  private onDrop(args) {
    let [e, el] = args;
    // do something
  }
  
  private onOver(args) {
    let [e, el, container] = args;
    // do something
  }
  
  private onOut(args) {
    let [e, el, container] = args;
    // do something
  }
}
