import { Directive, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';
//import * as d3 from 'd3';
import * as d3Array from 'd3-array';
import * as d3Format from 'd3-format';
import * as d3Hierarchy from 'd3-hierarchy';
import * as d3Scale from 'd3-scale';
import * as d3Selection from 'd3-selection';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Transition from 'd3-transition';
import * as d3Axis from 'd3-axis';
import * as d3Random from 'd3-random';


@Directive({
  selector: '[appChart]'
})
export class ChartDirective implements OnInit, AfterViewInit {
  //width = 975;
  //height = 1200;
  public focus: any;
  public root: any;
  cell;
  rect;


  // data1 = { "name": "flare", "children": [{ "name": "analytics", "children": [{ "name": "cluster", "children": [{ "name": "AgglomerativeCluster", "value": 3938 }, { "name": "CommunityStructure", "value": 3812 }, { "name": "HierarchicalCluster", "value": 6714 }, { "name": "MergeEdge", "value": 743 }] }, { "name": "graph", "children": [{ "name": "BetweennessCentrality", "value": 3534 }, { "name": "LinkDistance", "value": 5731 }, { "name": "MaxFlowMinCut", "value": 7840 }, { "name": "ShortestPaths", "value": 5914 }, { "name": "SpanningTree", "value": 3416 }] }, { "name": "optimization", "children": [{ "name": "AspectRatioBanker", "value": 7074 }] }] }, { "name": "animate", "children": [{ "name": "Easing", "value": 17010 }, { "name": "FunctionSequence", "value": 5842 }, { "name": "interpolate", "children": [{ "name": "ArrayInterpolator", "value": 1983 }, { "name": "ColorInterpolator", "value": 2047 }, { "name": "DateInterpolator", "value": 1375 }, { "name": "Interpolator", "value": 8746 }, { "name": "MatrixInterpolator", "value": 2202 }, { "name": "NumberInterpolator", "value": 1382 }, { "name": "ObjectInterpolator", "value": 1629 }, { "name": "PointInterpolator", "value": 1675 }, { "name": "RectangleInterpolator", "value": 2042 }] }, { "name": "ISchedulable", "value": 1041 }, { "name": "Parallel", "value": 5176 }, { "name": "Pause", "value": 449 }, { "name": "Scheduler", "value": 5593 }, { "name": "Sequence", "value": 5534 }, { "name": "Transition", "value": 9201 }, { "name": "Transitioner", "value": 19975 }, { "name": "TransitionEvent", "value": 1116 }, { "name": "Tween", "value": 6006 }] }, { "name": "data", "children": [{ "name": "converters", "children": [{ "name": "Converters", "value": 721 }, { "name": "DelimitedTextConverter", "value": 4294 }, { "name": "GraphMLConverter", "value": 9800 }, { "name": "IDataConverter", "value": 1314 }, { "name": "JSONConverter", "value": 2220 }] }, { "name": "DataField", "value": 1759 }, { "name": "DataSchema", "value": 2165 }, { "name": "DataSet", "value": 586 }, { "name": "DataSource", "value": 3331 }, { "name": "DataTable", "value": 772 }, { "name": "DataUtil", "value": 3322 }] }, { "name": "display", "children": [{ "name": "DirtySprite", "value": 8833 }, { "name": "LineSprite", "value": 1732 }, { "name": "RectSprite", "value": 3623 }, { "name": "TextSprite", "value": 10066 }] }, { "name": "flex", "children": [{ "name": "FlareVis", "value": 4116 }] }, { "name": "physics", "children": [{ "name": "DragForce", "value": 1082 }, { "name": "GravityForce", "value": 1336 }, { "name": "IForce", "value": 319 }, { "name": "NBodyForce", "value": 10498 }, { "name": "Particle", "value": 2822 }, { "name": "Simulation", "value": 9983 }, { "name": "Spring", "value": 2213 }, { "name": "SpringForce", "value": 1681 }] }, { "name": "query", "children": [{ "name": "AggregateExpression", "value": 1616 }, { "name": "And", "value": 1027 }, { "name": "Arithmetic", "value": 3891 }, { "name": "Average", "value": 891 }, { "name": "BinaryExpression", "value": 2893 }, { "name": "Comparison", "value": 5103 }, { "name": "CompositeExpression", "value": 3677 }, { "name": "Count", "value": 781 }, { "name": "DateUtil", "value": 4141 }, { "name": "Distinct", "value": 933 }, { "name": "Expression", "value": 5130 }, { "name": "ExpressionIterator", "value": 3617 }, { "name": "Fn", "value": 3240 }, { "name": "If", "value": 2732 }, { "name": "IsA", "value": 2039 }, { "name": "Literal", "value": 1214 }, { "name": "Match", "value": 3748 }, { "name": "Maximum", "value": 843 }, { "name": "methods", "children": [{ "name": "add", "value": 593 }, { "name": "and", "value": 330 }, { "name": "average", "value": 287 }, { "name": "count", "value": 277 }, { "name": "distinct", "value": 292 }, { "name": "div", "value": 595 }, { "name": "eq", "value": 594 }, { "name": "fn", "value": 460 }, { "name": "gt", "value": 603 }, { "name": "gte", "value": 625 }, { "name": "iff", "value": 748 }, { "name": "isa", "value": 461 }, { "name": "lt", "value": 597 }, { "name": "lte", "value": 619 }, { "name": "max", "value": 283 }, { "name": "min", "value": 283 }, { "name": "mod", "value": 591 }, { "name": "mul", "value": 603 }, { "name": "neq", "value": 599 }, { "name": "not", "value": 386 }, { "name": "or", "value": 323 }, { "name": "orderby", "value": 307 }, { "name": "range", "value": 772 }, { "name": "select", "value": 296 }, { "name": "stddev", "value": 363 }, { "name": "sub", "value": 600 }, { "name": "sum", "value": 280 }, { "name": "update", "value": 307 }, { "name": "variance", "value": 335 }, { "name": "where", "value": 299 }, { "name": "xor", "value": 354 }, { "name": "_", "value": 264 }] }, { "name": "Minimum", "value": 843 }, { "name": "Not", "value": 1554 }, { "name": "Or", "value": 970 }, { "name": "Query", "value": 13896 }, { "name": "Range", "value": 1594 }, { "name": "StringUtil", "value": 4130 }, { "name": "Sum", "value": 791 }, { "name": "Variable", "value": 1124 }, { "name": "Variance", "value": 1876 }, { "name": "Xor", "value": 1101 }] }, { "name": "scale", "children": [{ "name": "IScaleMap", "value": 2105 }, { "name": "LinearScale", "value": 1316 }, { "name": "LogScale", "value": 3151 }, { "name": "OrdinalScale", "value": 3770 }, { "name": "QuantileScale", "value": 2435 }, { "name": "QuantitativeScale", "value": 4839 }, { "name": "RootScale", "value": 1756 }, { "name": "Scale", "value": 4268 }, { "name": "ScaleType", "value": 1821 }, { "name": "TimeScale", "value": 5833 }] }, { "name": "util", "children": [{ "name": "Arrays", "value": 8258 }, { "name": "Colors", "value": 10001 }, { "name": "Dates", "value": 8217 }, { "name": "Displays", "value": 12555 }, { "name": "Filter", "value": 2324 }, { "name": "Geometry", "value": 10993 }, { "name": "heap", "children": [{ "name": "FibonacciHeap", "value": 9354 }, { "name": "HeapNode", "value": 1233 }] }, { "name": "IEvaluable", "value": 335 }, { "name": "IPredicate", "value": 383 }, { "name": "IValueProxy", "value": 874 }, { "name": "math", "children": [{ "name": "DenseMatrix", "value": 3165 }, { "name": "IMatrix", "value": 2815 }, { "name": "SparseMatrix", "value": 3366 }] }, { "name": "Maths", "value": 17705 }, { "name": "Orientation", "value": 1486 }, { "name": "palette", "children": [{ "name": "ColorPalette", "value": 6367 }, { "name": "Palette", "value": 1229 }, { "name": "ShapePalette", "value": 2059 }, { "name": "SizePalette", "value": 2291 }] }, { "name": "Property", "value": 5559 }, { "name": "Shapes", "value": 19118 }, { "name": "Sort", "value": 6887 }, { "name": "Stats", "value": 6557 }, { "name": "Strings", "value": 22026 }] }, { "name": "vis", "children": [{ "name": "axis", "children": [{ "name": "Axes", "value": 1302 }, { "name": "Axis", "value": 24593 }, { "name": "AxisGridLine", "value": 652 }, { "name": "AxisLabel", "value": 636 }, { "name": "CartesianAxes", "value": 6703 }] }, { "name": "controls", "children": [{ "name": "AnchorControl", "value": 2138 }, { "name": "ClickControl", "value": 3824 }, { "name": "Control", "value": 1353 }, { "name": "ControlList", "value": 4665 }, { "name": "DragControl", "value": 2649 }, { "name": "ExpandControl", "value": 2832 }, { "name": "HoverControl", "value": 4896 }, { "name": "IControl", "value": 763 }, { "name": "PanZoomControl", "value": 5222 }, { "name": "SelectionControl", "value": 7862 }, { "name": "TooltipControl", "value": 8435 }] }, { "name": "data", "children": [{ "name": "Data", "value": 20544 }, { "name": "DataList", "value": 19788 }, { "name": "DataSprite", "value": 10349 }, { "name": "EdgeSprite", "value": 3301 }, { "name": "NodeSprite", "value": 19382 }, { "name": "render", "children": [{ "name": "ArrowType", "value": 698 }, { "name": "EdgeRenderer", "value": 5569 }, { "name": "IRenderer", "value": 353 }, { "name": "ShapeRenderer", "value": 2247 }] }, { "name": "ScaleBinding", "value": 11275 }, { "name": "Tree", "value": 7147 }, { "name": "TreeBuilder", "value": 9930 }] }, { "name": "events", "children": [{ "name": "DataEvent", "value": 2313 }, { "name": "SelectionEvent", "value": 1880 }, { "name": "TooltipEvent", "value": 1701 }, { "name": "VisualizationEvent", "value": 1117 }] }, { "name": "legend", "children": [{ "name": "Legend", "value": 20859 }, { "name": "LegendItem", "value": 4614 }, { "name": "LegendRange", "value": 10530 }] }, { "name": "operator", "children": [{ "name": "distortion", "children": [{ "name": "BifocalDistortion", "value": 4461 }, { "name": "Distortion", "value": 6314 }, { "name": "FisheyeDistortion", "value": 3444 }] }, { "name": "encoder", "children": [{ "name": "ColorEncoder", "value": 3179 }, { "name": "Encoder", "value": 4060 }, { "name": "PropertyEncoder", "value": 4138 }, { "name": "ShapeEncoder", "value": 1690 }, { "name": "SizeEncoder", "value": 1830 }] }, { "name": "filter", "children": [{ "name": "FisheyeTreeFilter", "value": 5219 }, { "name": "GraphDistanceFilter", "value": 3165 }, { "name": "VisibilityFilter", "value": 3509 }] }, { "name": "IOperator", "value": 1286 }, { "name": "label", "children": [{ "name": "Labeler", "value": 9956 }, { "name": "RadialLabeler", "value": 3899 }, { "name": "StackedAreaLabeler", "value": 3202 }] }, { "name": "layout", "children": [{ "name": "AxisLayout", "value": 6725 }, { "name": "BundledEdgeRouter", "value": 3727 }, { "name": "CircleLayout", "value": 9317 }, { "name": "CirclePackingLayout", "value": 12003 }, { "name": "DendrogramLayout", "value": 4853 }, { "name": "ForceDirectedLayout", "value": 8411 }, { "name": "IcicleTreeLayout", "value": 4864 }, { "name": "IndentedTreeLayout", "value": 3174 }, { "name": "Layout", "value": 7881 }, { "name": "NodeLinkTreeLayout", "value": 12870 }, { "name": "PieLayout", "value": 2728 }, { "name": "RadialTreeLayout", "value": 12348 }, { "name": "RandomLayout", "value": 870 }, { "name": "StackedAreaLayout", "value": 9121 }, { "name": "TreeMapLayout", "value": 9191 }] }, { "name": "Operator", "value": 2490 }, { "name": "OperatorList", "value": 5248 }, { "name": "OperatorSequence", "value": 4190 }, { "name": "OperatorSwitch", "value": 2581 }, { "name": "SortOperator", "value": 2023 }] }, { "name": "Visualization", "value": 16540 }] }] };


  // myData1 = [
  //   {
  //     lessonId: "5db0d538-35e9-429b-80e4-98f5a91ca228",
  //     name: "lesson_1",
  //     section: "1a",
  //     cardId: "3f4fb79e-8d69-4b05-b516-208bcadacc0a",
  //     userCardId: "55e779d1-ab06-4167-be04-bc176c961e72",
  //     score: 10,
  //     status: "doing"
  //   },
  //   {
  //     lessonId: "5db0d538-35e9-429b-80e4-98f5a91ca228",
  //     name: "lesson_1",
  //     section: "1b",
  //     cardId: "90432934-a05a-47ee-8589-11c1e80481bc",
  //     userCardId: "91bae082-4ca9-4599-9963-2efb2aad485d",
  //     score: 10,
  //     status: "doing",
  //   },
  //   {
  //     lessonId: "1db0d538-35e9-429b-80e4-98f5a91ca228",
  //     name: "lesson_2",
  //     section: "1b",
  //     cardId: "90432934-a05a-47ee-8589-11c1e80481bc",
  //     userCardId: "91bae082-4ca9-4599-9963-2efb2aad485d",
  //     score: 10,
  //     status: "doing",
  //   },
  //   {
  //     lessonId: "2db0d538-35e9-429b-80e4-98f5a91ca228",
  //     name: "lesson_3",
  //     section: "1a",
  //     cardId: "90432934-a05a-47ee-8589-11c1e80481bc",
  //     userCardId: "91bae082-4ca9-4599-9963-2efb2aad485d",
  //     score: 10,
  //     status: "doing",
  //   },
  //   {
  //     lessonId: "2db0d538-35e9-429b-80e4-98f5a91ca228",
  //     name: "lesson_3",
  //     section: "2a",
  //     cardId: "90432934-a05a-47ee-8589-11c1e80481bc",
  //     userCardId: "91bae082-4ca9-4599-9963-2efb2aad485d",
  //     score: 10,
  //     status: "doing",
  //   }
  // ];
// 

  // data = {
  //   "name": "flare",
  //   "children": [
  //    {
  //     "name": "Chapter 1",
  //     "children": [
  //      {
  //       "name": "section 1",
  //       "children": [
  //        {"name": "subsection 1a", "value": 1},
  //        {"name": "subsection 1b", "value": 1},
  //        {"name": "subsection 1c", "value": 1},
  //        {"name": "subsection 1d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 2",
  //       "children": [
  //        {"name": "subsection 2a", "value": 1},
  //        {"name": "subsection 2b", "value": 1},
  //        {"name": "subsection 2c", "value": 1},
  //        {"name": "subsection 2d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 3",
  //       "children": [
  //        {"name": "subsection 3a", "value": 1},
  //        {"name": "subsection 3b", "value": 1},
  //        {"name": "subsection 3c", "value": 2},
  //        {"name": "subsection 4d", "value": 2}
  //       ]
  //      }
  //     ]
  //    },
  //    {
  //     "name": "Chapter 2",
  //     "children": [
  //      {
  //       "name": "section 1",
  //       "children": [
  //        {"name": "subsection 1a", "value": 1},
  //        {"name": "subsection 1b", "value": 1},
  //        {"name": "subsection 1c", "value": 1},
  //        {"name": "subsection 1d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 2",
  //       "children": [
  //        {"name": "subsection 2a", "value": 1},
  //        {"name": "subsection 2b", "value": 1},
  //        {"name": "subsection 2c", "value": 1},
  //        {"name": "subsection 2d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 3",
  //       "children": [
  //        {"name": "subsection 3a", "value": 4},
  //        {"name": "subsection 3b", "value": 1},
  //        {"name": "subsection 3c", "value": 2},
  //        {"name": "subsection 4d", "value": 2}
  //       ]
  //      }
  //     ]
  //    },
  //    {
  //     "name": "Chapter 3",
  //     "children": [
  //      {
  //       "name": "section 1",
  //       "children": [
  //        {"name": "subsection 1a", "value": 4},
  //        {"name": "subsection 1b", "value": 1},
  //        {"name": "subsection 1c", "value": 8},
  //        {"name": "subsection 1d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 2",
  //       "children": [
  //        {"name": "subsection 2a", "value": 1},
  //        {"name": "subsection 2b", "value": 1},
  //        {"name": "subsection 2c", "value": 1},
  //        {"name": "subsection 2d", "value": 1}
  //       ]
  //      },
  //      {
  //       "name": "section 3",
  //       "children": [
  //        {"name": "subsection 3a", "value": 4},
  //        {"name": "subsection 3b", "value": 1},
  //        {"name": "subsection 3c", "value": 2},
  //        {"name": "subsection 4d", "value": 2}
  //       ]
  //      }
  //     ]
  //    }
  //   ]
  //  }
  format = d3Format.format(",d");
  myData1:any;
  svg: any;
  tspan: any;
  text: any;
  root1: d3Hierarchy.PartitionLayout<{}>;
  partition1: d3Hierarchy.PartitionLayout<{}>;
  root2: any;
  myData: any;
  rect1: any;


  x: any;
  xAxis: (g: any) => any;
  yAxis: (g: any) => any;
  //color1 = d3.scaleOrdinal(["steelblue", "#aaa"])
  margin = ({ top: 30, right: 30, bottom: 0, left: 100 })

  barStep = 27
  barPadding = 3 / this.barStep
  duration = 750
  max = 1;
  color:any;

  hierarchyData: any;
  totalScore:any;

  @Input ('myOriginalData')set myOriginalData(value) {
    this.myData = value;
  }

  height;
  @Input('ObjectHeight') set heightFromApp(value) {
    this.height = value;
  }

  width;
  @Input('ObjectWidth') set widthFromApp(value) {
    this.width = value;
  }

  constructor(private el: ElementRef) {
    // console.log('1',  this.hierarchyData);
    // var x = d3.scaleLinear()
    //   .range([0, this.width]);

    // var y = d3.scaleLinear()
    //   .range([0, this.height]);

    //var rect = this.svg.selectAll("rect");

  }

  ngOnInit() {
    // console.log("waht is ",this.hierarchyData,this.hierarchyData.node)
    //this.color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow,  this.hierarchyData.children.length + 1));

    const reduceFn = data => d3Array.sum(data, d => d['score']);

    const rollupData = d3Array.rollup(this.myData, reduceFn, d => d['lesson']);

    const childrenAccessorFn = ([key, value]) => value.size && Array.from(value)

    this.hierarchyData = d3Hierarchy.hierarchy([null, rollupData], childrenAccessorFn)
      .sum(([key, value]) => value);

    this.totalScore = d3Array.sum(this.myData, d => d['score']);
    console.log('this.totalScore',  this.totalScore)
  }

  ngAfterViewInit() {
    this.createChart2();
  }


  partition(data) {
    this.root = d3Hierarchy.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value);

    return d3Hierarchy.partition()
      .size([this.height, (this.root.height + 1) * this.width / 3])
      (this.root);
  }



  createChart2() {
    const margin = ({ top: 30, right: 30, bottom: 0, left: 100 });
    const barStep = 27
    const barPadding = 3 / this.barStep
    const duration = 750
    //const max = 1;
    const color = d3Scale.scaleOrdinal().range([ "#5ba7e4", "#FA4556"]).domain([ "true","false"]);
  
    function height1() {
      let max = 1;
      root2.each(d => {d.children && (max = (d.children.length)?Math.max(max, d.children.length):1)});
      return (max * barStep + margin.top + margin.bottom) as number;
    }


    const root2 = d3Hierarchy.hierarchy( this.hierarchyData)
      .sum(d => d['value'])
      .sort((a, b) => b.value - a.value)
      .eachAfter(d => d['index'] = d.parent ? d.parent['index'] = d.parent['index'] + 1 || 0 : 0)


    const x = d3Scale.scaleLinear().range([this.margin.left, this.width - this.margin.right])

    const xAxis = g => g
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${this.margin.top})`)
      .call(d3Axis.axisTop(x).ticks(this.width / 80, "s"))
      .call(g => (g.selection ? g.selection() : g).select(".domain").remove())

    const yAxis = g => g
      .attr("class", "y-axis")
      .attr("transform", `translate(${this.margin.left + 0.5},0)`)
      .call(g => g.append("line")
        .attr("stroke", "currentColor")
        .attr("y1", this.margin.top)
        .attr("y2", +height1() - this.margin.bottom))

    const svg = d3Selection.select(this.el.nativeElement).append('svg')
      .attr("viewBox", `0 0 ${this.width} ${this.height}`)
      .style("font", "14px sans-serif");

      svg.append("text")
        .attr("x", 0)
        .attr("y", "0.4em")
        .attr("dy", ".35em")
        .text(d => 'The current score is '+this.totalScore.toString())
        .style("font", "14px sans-serif");

    x.domain([0, root2.value]);

    svg.append("rect")
      .attr("class", "background")
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .attr("width", this.width)
      .attr("height", height1)
      .attr("cursor", "pointer")
      .on("click", d => up(svg, d));

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

    down(svg, root2);

    return svg.node();



    function bar(svg, down, d, selector) {
   
      const g = svg.insert("g", selector)
        .attr("class", "enter")
        .attr("transform", `translate(0,${margin.top + barStep * barPadding})`)
        .attr("text-anchor", "end")
        .style("font", "14px sans-serif");
  
      const bar = g.selectAll("g")
        .data(d.children)
        .join("g")
        .attr("cursor", d => !d.children ? null : "pointer")
        .on("click", d => {!d.children ? d.data.data.lesson : down(svg, d)});
  
      bar.append("text")
        .attr("x", margin.left - 6)
        .attr("y", barStep * (1 - barPadding) / 2)
        .attr("dy", ".35em")
        .text(d => d.data.data.slice(0, 1)[0]);
  //console.log('d.data.data',d.data.data.slice(0, 1)[0])
      bar.append("rect")
        .attr("x", x(0))
        .attr("width", d => x(d.value) - x(0))
        .attr("height", barStep * (1 - barPadding));
  
      return g;
    }
  
    function down(svg, d) {
      //console.log('down?',d);
      const duration = 750
      if (!d.children || d3Transition.active(svg.node())) return;
  
      // Rebind the current node to the background.
      svg.select(".background").datum(d);
  
      // Define two sequenced transitions.
      const transition1 = svg.transition().duration(duration);
      const transition2 = transition1.transition();
  
      // Mark any currently-displayed bars as exiting.
      const exit = svg.selectAll(".enter")
        .attr("class", "exit");
  
      // Entering nodes immediately obscure the clicked-on bar, so hide it.
      exit.selectAll("rect")
        .attr("fill-opacity", p => p === d ? 0 : null);
  
      // Transition exiting bars to fade out.
      exit.transition(transition1)
        .attr("fill-opacity", 0)
        .remove();
  
      // Enter the new bars for the clicked-on data.
      // Per above, entering bars are immediately visible.
      const enter = bar(svg, down, d, ".y-axis")
        .attr("fill-opacity", 0);
  
      // Have the text fade-in, even though the bars are visible.
      enter.transition(transition1)
        .attr("fill-opacity", 1);
  
      // Transition entering bars to their new y-position.
      enter.selectAll("g")
        .attr("transform", stack(d.index))
        .transition(transition1)
        .attr("transform", stagger());
  
      // Update the x-scale domain.
      x.domain([0, Number(d3Array.max(d.children, d => d['value']))]);
  
      // Update the x-axis.
      svg.selectAll(".x-axis").transition(transition2)
        .call(xAxis);
  
      // Transition entering bars to the new x-scale.
      enter.selectAll("g").transition(transition2)
        .attr("transform", (d, i) => `translate(0,${barStep * i})`);
  
      // Color the bars as parents; they will fade to children if appropriate.
      enter.selectAll("rect")
        //.attr("fill", this.color1(true))
        .attr("fill", color("true"))
        .attr("fill-opacity", 1)
        .transition(transition2)
        .attr("fill", d => color((!!d.children).toString()))
        //.attr("fill", d => 'red')
        .attr("width", d => x(d.value) - x(0));
    }
  
  
    function up(svg, d) {
    
      if (!d.parent || !svg.selectAll(".exit").empty()) return;
  
      // Rebind the current node to the background.
      svg.select(".background").datum(d.parent);
  
      // Define two sequenced transitions.
      const transition1 = svg.transition().duration(duration);
      const transition2 = transition1.transition();
  
      // Mark any currently-displayed bars as exiting.
      const exit = svg.selectAll(".enter")
        .attr("class", "exit");
  
      // Update the x-scale domain.
      x.domain([0, Number(d3Array.max(d.parent.children, d => d['value']))]);
  
      // Update the x-axis.
      svg.selectAll(".x-axis").transition(transition1)
        .call(xAxis);
  
      // Transition exiting bars to the new x-scale.
      exit.selectAll("g").transition(transition1)
        .attr("transform", stagger());
  
      // Transition exiting bars to the parent’s position.
      exit.selectAll("g").transition(transition2)
        .attr("transform", stack(d.index));
  
      // Transition exiting rects to the new scale and fade to parent color.
      exit.selectAll("rect").transition(transition1)
        .attr("width", d => x(d.value) - x(0))
        .attr("fill", color("true"));
        //.attr("fill", 'blue');
  
      // Transition exiting text to fade out.
      // Remove exiting nodes.
      exit.transition(transition2)
        .attr("fill-opacity", 0)
        .remove();
  
      // Enter the new bars for the clicked-on data's parent.
      const enter = bar(svg, down, d.parent, ".exit")
        .attr("fill-opacity", 0);
  
      enter.selectAll("g")
        .attr("transform", (d, i) => `translate(0,${barStep * i})`);
  
      // Transition entering bars to fade in over the full duration.
      enter.transition(transition2)
        .attr("fill-opacity", 1);
  
      // Color the bars as appropriate.
      // Exiting nodes will obscure the parent bar, so hide it.
      // Transition entering rects to the new x-scale.
      // When the entering parent rect is done, make it visible!
      enter.selectAll("rect")
        //.attr("fill", d => color(!!d.children).toString())
        .attr("fill", d => color((!!d.children).toString()))
        //.attr("fill", d => 'yellow')
        .attr("fill-opacity", p => p === d ? 0 : null)
        .transition(transition2)
        .attr("width", d => x(d.value) - x(0))
        .on("end", function (p) { d3Selection.select(this).attr("fill-opacity", 1); });
    }
  
    function stack(i) {
      let value = 0;
      return d => {
        const t = `translate(${x(value) - x(0)},${barStep * i})`;
        value += d.value;
        return t;
      };
    }
  
    function stagger() {
      let value = 0;
      return (d, i) => {
        const t = `translate(${x(value) - x(0)},${barStep * i})`;
        value += d.value;
        return t;
      };
    }
  }


 



  // createChart1() {
  //   //   root = d3.hierarchy(d3.entries(root)[0], function(d) {
  //   //     return d3.entries(d.value)
  //   //   })
  //   //   .sum(function(d) { return d.value })
  //   //   .sort(function(a, b) { return b.value - a.value; });

  //   // partition(root);

  //   // rect = rect
  //   //     .data(root.descendants())
  //   //   .enter().append("rect")
  //   //     .attr("x", function(d) { return d.x0; })
  //   //     .attr("y", function(d) { return d.y0; })
  //   //     .attr("width", function(d) { return d.x1 - d.x0; })
  //   //     .attr("height", function(d) { return d.y1 - d.y0; })
  //   //     .attr("fill", function(d) { return color((d.children ? d : d.parent).data.key); })
  //   //     .on("click", clicked);
  //   var partition = d3Hierarchy.partition()
  //     .size([this.width, this.height])
  //     .padding(0)
  //     .round(true);

  //   var color = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
  //   this.svg = d3Selection.select(this.el.nativeElement).append('svg')
  //     .attr("viewBox", `0 0 ${this.width} ${this.height}`)
  //     .style("font", "10px sans-serif");

  //   var x = d3Scale.scaleLinear()
  //     .range([0, this.width]);

  //   var y = d3Scale.scaleLinear()
  //     .range([0, this.height]);

  //   this.root2 = d3Hierarchy.hierarchy( this.hierarchyData)
  //     .sum(function (d) { return d['value'] })
  //     .sort(function (a, b) { return b.value - a.value; });

  //   partition(this.root2);

  //   const rect1 = this.svg.selectAll("rect")
  //     .data(this.root2.descendants())
  //     .enter().append("rect")
  //     .attr("x", function (d) { return d.x0; })
  //     .attr("y", function (d) { return d.y0; })
  //     .attr("width", function (d) { return d.x1 - d.x0; })
  //     .attr("height", function (d) { return d.y1 - d.y0; })
  //     .attr("fill", function (d) { return color((d.children ? d : d.parent).data.key); })
  //     .on("click", clicked);

  //   function clicked(d) {
  //     x.domain([d.x0, d.x1]);
  //     y.domain([d.y0, this.height.baseVal.value]).range([d.depth ? 20 : 0, this.height.baseVal.value]);

  //     rect1.transition()
  //       .duration(750)
  //       .attr("x", function (d) { return x(d.x0); })
  //       .attr("y", function (d) { return y(d.y0); })
  //       .attr("width", function (d) { return x(d.x1) - x(d.x0); })
  //       .attr("height", function (d) { return y(d.y1) - y(d.y0); });
  //   }
  // }

  // createChart() {

  //   const root = this.partition( this.hierarchyData);
  //   let focus = root;

  //   this.svg = d3Selection.select(this.el.nativeElement).append('svg')
  //     .attr("viewBox", `0 0 ${this.width} ${this.height}`)
  //     .style("font", "10px sans-serif");

  //   const cell = this.svg
  //     .selectAll("g")
  //     .data(this.root.descendants())
  //     .join("g")
  //     .attr("transform", d => `translate(${d['y0']},${d['x0']})`);

  //   const rect = cell.append("rect")
  //     .attr("width", d => d.y1 - d.y0 - 1)
  //     .attr("height", d => d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2))
  //     .attr("fill-opacity", 0.6)
  //     .attr("fill", d => {
  //       if (!d.depth) return "#ccc";
  //       while (d.depth > 1) d = d.parent;
  //       return this.color(d.data.name);
  //     })
  //     .style("cursor", "pointer")
  //     .on("click", clicked);

  //   const text = cell.append("text")
  //     .style("user-select", "none")
  //     .attr("pointer-events", "none")
  //     .attr("x", 4)
  //     .attr("y", 13)
  //     .attr("fill-opacity", d => +this.labelVisible(d));

  //   text.append("tspan")
  //     .text(d => d.data.name);

  //   const tspan = text.append("tspan")
  //     .attr("fill-opacity", d => +this.labelVisible(d) * 0.7)
  //     .text(d => ` ${this.format(d.value)}`);

  //   cell.append("title")
  //     .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${this.format(d.value)}`);

  //   function clicked(p) {
  //     focus = focus === p ? p = p.parent : p;

  //     root.each(d => d['target'] = {
  //       x0: (d.x0 - p.x0) / (p.x1 - p.x0) * this.height.baseVal.value,
  //       x1: (d.x1 - p.x0) / (p.x1 - p.x0) * this.height.baseVal.value,
  //       y0: d['y0'] - p['y0'],
  //       y1: d.y1 - p.y0
  //     });

  //     const t = cell
  //       .transition().duration(750)
  //       .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

  //     rect.transition(t).attr("height", d => { console.log('target:', d['target']); return d['target'].x1 });
  //     // text.transition(t).attr("fill-opacity", d => {console.log('this.labelVisible(d)',this.labelVisible(d['target']));return this.labelVisible(d['target'])});
  //     // tspan.transition(t).attr("fill-opacity", d => this.labelVisible(d['target']) * 0.7);


  //     // original
  //     //     const t = cell.transition().duration(750)
  //     //     .attr("transform", d => `translate(${d.target.y0},${d.target.x0})`);

  //     // rect.transition(t).attr("height", d => rectHeight(d.target));
  //     // text.transition(t).attr("fill-opacity", d => +labelVisible(d.target));
  //     // tspan.transition(t).attr("fill-opacity", d => labelVisible(d.target) * 0.7);
  //   }

  //   return this.svg.node();
  // }

  rectHeight(d) {
    return d.x1 - d.x0 - Math.min(1, (d.x1 - d.x0) / 2);
  }

  labelVisible(d) {
    return d.y1 <= this.width && d.y0 >= 0 && d.x1 - d.x0 > 16;
  }


  createLineChart() {
    var data = [];

    for (var i = 0; i < 20; i++) {
      var num = d3Random.randomUniform(1, 50)();
      data.push(num);
    }

    d3Selection.select(this.el.nativeElement)
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .classed('bar', true)
      .style('height', function (d) {
        return d * 10 + "px";
      })
      .style('width', "32px")
      .style('display', 'inline-block')
      .style('background-color', '#7ED26D')
      .style('margin-left', '5px');
  }



}
