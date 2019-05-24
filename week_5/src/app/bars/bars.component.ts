import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.css']
})
export class BarsComponent implements OnChanges {

  @Input()
  public bars: any[];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {

    console.log('pffefwh.. drawing!');

    //Let the D3 Magic begin!
    var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

    //clean svg
    d3.selectAll("svg > *").remove();

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(this.bars.map(i => i.name));
    y.domain([0, d3.max(this.bars, i => i.length)]);

    g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .on('click', () => console.log('x-axis'));


    g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y).ticks(1))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Frequency");

    g.selectAll(".bar")
      .data(this.bars)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .style("fill", "#2e2e2e")
      .on('mouseup', this.select) //click
      .attr("x", d => x(d.name))
      .attr("y", d => y(d.length))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - y(d.length))
  }
  
  private previous: Bar;

  public select(bar) {
    this.previous ? this.previous.isSelected = false : null;
    bar.isSelected = true; 
    this.previous = bar;

  }
}

export class Bar {

  public isSelected : boolean;

  constructor(public name, public length) { }

}
