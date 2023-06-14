    //   this is our data for the bar graph
const data = [
    { name: "Simran", score: 23 },
    { name: "Aniket", score: 87 },
    { name: "Abhisekh", score: 34 },
    { name: "Divya", score: 78 },
    { name: "Krishna", score: 45 },
    { name: "Deepali", score: 100 },
]

// height and width of the svg file
var width = 800
var height = 400
var margin = { top: 50, bottom: 50, left: 50, right: 50 } 


const svg = d3.select("#d3-container")    // so here we are selecting the div with id d3-conatiner using select() method
.append("svg")   // so here we create and insert a new tag in div
// mentioning height and width of the xAxis and yAxis line
.attr("height", height - margin.top - margin.bottom)
.attr("width", width - margin.left - margin.right)
.attr("viewBox",[0,0,width,height]) 


const x = d3.scaleBand()  // now the xAxis creation where the name of the students are mentioned 
.domain(d3.range(data.length)) // range of the XAxis calculated by the length of the array data[]
.range([margin.left,width-margin.right]) // alignment of the data according to the width of the SVG 
.padding(0.5) // gapping between the graph bars

const y = d3.scaleLinear()   // now the yAxis creation where the Score of the students are mentioned 
.domain([0,100]) // denotes the range of score on yAxis from 1-100
.range([height-margin.bottom,margin.top]) // alignment of the data according to the heigth of the SVG 

svg  // here we set the height of the bar according to the data
.append('g') // creation of new tag in SVG tag
.attr('fill','#67cadf') // color for the bars adding of attribute to the <g> tag
.selectAll('rect') // element iterate fir different bars.
.data(data.sort((a,b)=>d3.descending(a.score,b.score))) // data is sorted in decending order that why you can see the height/range of the of the data in decending order
.join('rect') // putting the data and sorting and displaying them in the SVG File
.attr('x',(d,i)=>x(i))  // iterating through the names
.attr('y',(d)=>y(d.score)) // iterating through the scores
.attr('height',d=>y(0)-y(d.score)) // raising the height to the desired data level
.attr('width',x.bandwidth()) 
.attr('class','rectangle')


//setlling the name according to the data
function xAxis(g){
    g.attr('transform',`translate(0,${height-margin.bottom})`) 
    .call(d3.axisBottom(x).tickFormat(i=>data[i].name))   
}

//setlling the score according to the data
function yAxis(g){
    g.attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null,data.format))
}

svg.append('g').call(xAxis); //when g retrieve the data it make a call to xAxis 
svg.append('g').call(yAxis); //when g retrieve the data it make a call to yAxis
svg.node();




