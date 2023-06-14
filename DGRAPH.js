const data = [
    { name: "simran", score: 23 },
    { name: "Aniket", score: 90 },
    { name: "abhisekh", score: 34 },
    { name: "divya", score: 78 },
    { name: "kikola", score: 98 },
    { name: "deepali", score: 100 },
]

var width = 800
var height = 400
var margin = { top: 50, bottom: 50, left: 50, right: 50 }

const svg = d3.select("#d3-container").append("svg")
.attr("height", height - margin.top - margin.bottom)
.attr("width", width - margin.left - margin.right)
.attr("viewBox",[0,0,width,height])

const x = d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left,width-margin.right])
.padding(0.1);

const y = d3.scaleLinear()
.domain([0,100])
.range([height-margin.bottom,margin.top])

svg
.append('g')
.attr('fill','royalblue')
.selectAll('rect')
.data(data.sort((a,b)=>d3.descending(a.score,b.score)))
.join('rect')
.attr('x',(d,i)=>x(i))
.attr('y',(d)=>y(d.score))
.attr('height',d=>y(0)-y(d.score))
.attr('width',x.bandwidth())

function xAxis(g){
    g.attr('transform',`translate(0,${height-margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i=>data[i].name))
    .attr('font-size','20px')
}

function yAxis(g){
    g.attr('transform',`translate(${margin.left},0)`)
    .call(d3.axisLeft(y).ticks(null,data.format))
    .attr('font-size','20px')
}

svg.append('g').call(xAxis);
svg.append('g').call(yAxis);
svg.node();




