import { Component, OnInit, Input, ElementRef } from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent {
  width = 250
  height = 250
  margin = 40
  radius;
  svg;
  color;
  pie;
  data_ready;

  // Create dummy data
  public data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.draw();
  }

  draw() {

    this.radius = Math.min(this.width, this.height) / 2 - this.margin

    this.svg = d3.select(this.el.nativeElement).append("svg")
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height)
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," +
        this.height / 2 + ")");

    this.color = d3.scaleOrdinal()
      .domain(Object.keys(this.data))
      .range(d3.schemeDark2);

    this.pie = d3.pie()
      .value(function (d) { return d.value })

    this.data_ready = this.pie(d3.entries(this.data))

    this.svg
      .selectAll('whatever')
      .data(this.data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(100)         // size of the donut hole
        .outerRadius(this.radius))
      .attr('fill', (d) => { return (this.color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
    
  }
}
