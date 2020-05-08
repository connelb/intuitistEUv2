import { Directive, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Transition from 'd3-transition';
import * as d3Axis from 'd3-axis';
import * as d3Random from 'd3-random';
import * as d3Collection from 'd3-collection';


// <div *ngIf='myData' appProgressBar [myOriginalData]="myData" [ObjectHeight]="height" [ObjectWidth]="width"></div>

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective implements OnInit, AfterViewInit {
  color = d3Scale.scaleOrdinal().range(['green', "yellow", 'grey'])//.domain(["doing", "done", "toDo"]);
  myData: any;
 
  height = 30;
  // goal = 600;
  x: any;
  xAxis: (g: any) => any;
  yAxis: (g: any) => any;
  //color1 = d3.scaleOrdinal(["steelblue", "#aaa"])
  margin = ({ top: 2, right: 2, bottom: 2, left: 2 })
  perc_so_far = this.margin.left;
  svg: any;
  bar: any;

  data: any
  myScore: { 'toDo': any; 'doing': any; 'done': any; };
  total: any;
  myScoreArray: any[];
  toDo: any;
  doing: any;
  done: any;

  //data.sort(d3.descending());




  @Input('myOriginalData') set myOriginalData(value) {
    this.myData = value;
  }

  // height;
  // @Input('ObjectHeight') set heightFromApp(value) {
  //   this.height = value;
  // }

  width;
  @Input('ObjectWidth') set widthFromApp(value) {
    this.width = value*0.5;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.toDo = (this.myData[0].value.tally) ? this.myData[0].value.tally : 0;
    this.doing = (this.myData[1].value.tally) ? this.myData[1].value.tally : 0;
    this.done = (this.myData[2].value.tally) ? this.myData[2].value.tally : 0;
    this.myScoreArray = [this.done, this.doing, this.toDo]
    this.total = this.myScoreArray.reduce((a, b) => a + b, 0)
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    // const svg = d3Selection.select(element1).append('svg')
    //   .attr("width", '100%')
    //   .attr("height", '100%')
    //   .attr('viewBox', '0 0 ' + Math.min(this.width, this.height) + ' ' + Math.min(this.width, this.height) * 10)
    //   .append("g")
    //   .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svg = d3Selection.select(this.el.nativeElement).append('svg')
    .attr('viewBox', '0 0 ' + Math.min(this.width*1.1) + ' 30');

    this.bar = this.svg.selectAll("g")
      .data(this.myScoreArray)
      .enter().append("g");
      //-this.margin.left-this.margin.right

    this.bar.append("rect")
      .attr("y",this.margin.top)
      .attr("width",  d => ((d/this.total) * (this.width)))
      .attr("x", d => {
        var prev_perc = this.perc_so_far;
        var this_perc = this.width * (d / this.total);
        this.perc_so_far = this.perc_so_far + this_perc;
        return prev_perc;
      })
      .attr("height", 30)
      .attr("fill", d => { return (this.color(d)) });

    this.bar.append("text") // adding the text labels to the bar
      // .data(data)
      // .enter().append("text")
      .style("font", "14px sans-serif")
      .style('fill', 'darkOrange')
      .attr("x", d => {
        var prev_perc = this.perc_so_far;
        var this_perc = this.width * (d / this.total);
        this.perc_so_far = this.perc_so_far + this_perc;
        return prev_perc;
      })
      .attr("y", 10) // y position of the text inside bar
      .attr("dx", -3) // padding-right
      .attr("dy", ".35em") // vertical-align: middle
      .attr("text-anchor", "end") // text-align: right
      .text(d => d);

    // d3.select(window).on('resize', resize);
  }


  // resize() {
  //   var width = parseInt(d3.select("#chart").style("width"));
  //   //console.log(width);
  //   //console.log(bar);
  // }
}
