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
  color = d3Scale.scaleOrdinal().range(["#5ba7e4", "#FA4556", 'grey']).domain(["doing", "done", "toDo"]);
  myData: any;
  perc_so_far = 0;
  height = 20;
  goal = 600;
  x: any;
  xAxis: (g: any) => any;
  yAxis: (g: any) => any;
  //color1 = d3.scaleOrdinal(["steelblue", "#aaa"])
  margin = ({ top: 30, right: 30, bottom: 0, left: 100 })
  svg: d3Selection.Selection<SVGSVGElement, {}, null, undefined>;
  bar: any;

  data: any

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
    this.width = value;
  }

  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.data =  d3Collection.nest()
      .key(function (d: any) { return d['status']; })
      .rollup(function (leaves: any) {
        return {
          total: d3Array.sum(leaves, function (d) {
            return d['score'];
          }), tally: leaves.length
        } as any
      })
      .entries(this.myData);


      console.log('this.data', this.data)
  // }


    // console.log("waht is ",this.hierarchyData,this.hierarchyData.node)
    //this.color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow,  this.hierarchyData.children.length + 1));

    // const reduceFn = data => d3Array.sum(data, d => d['score']);

    // const rollupData = d3Array.rollup(this.myData, reduceFn, d => d['lesson']);

    // const childrenAccessorFn = ([key, value]) => value.size && Array.from(value)

    // this.hierarchyData = d3Hierarchy.hierarchy([null, rollupData], childrenAccessorFn)
    //   .sum(([key, value]) => value);

    // this.totalScore = d3Array.sum(this.myData, d => d['score']);
    // console.log('this.totalScore',  this.totalScore)
  }

  ngAfterViewInit() {
    this.render();
  }

  render() {
    this.svg = d3Selection.select(this.el.nativeElement).append('svg')
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .style("font", "14px sans-serif");

    this.bar = this.svg.selectAll("g")
      .data(this.myData)
      .enter().append("g");

    this.bar.append("rect")
      .attr("width", function (d) { return ((d / this.total_score) * 100) + "%"; })
      .attr("x", function (d) {
        var prev_perc = this.perc_so_far;
        var this_perc = 100 * (d / this.total_time);
        this.perc_so_far = this.perc_so_far + this_perc;
        return prev_perc + "%";
      })
      .attr("height", this.height)
      .attr("fill", function (d) { return (this.color(d)) });

    // d3.select(window).on('resize', resize);
  }


  // resize() {
  //   var width = parseInt(d3.select("#chart").style("width"));
  //   //console.log(width);
  //   //console.log(bar);
  // }
}
