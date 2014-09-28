var w = 750;
var h = 750;
var r = h/1.8;

function plural_str(i, str1, str2, str3){
	function plural (a){
		if ( a % 10 == 1 && a % 100 != 11 ) return 0
		else if ( a % 10 >= 2 && a % 10 <= 4 && ( a % 100 < 10 || a % 100 >= 20)) return 1
			else return 2;
		}
		switch (plural(i)) {
			case 0: return str1;
			case 1: return str2;
			default: return str3;
	}
}

var color = d3.scale.category20c();
var data = [
	{"value":447, "field": "Естественнонаучная", color: "green"},
	{"value":768, "field": "Техническая", color: "red"}, 
	{"value":177, "field": "Туристско-краеведческая", color: "DeepSkyBlue "},
	{"value":138, "field": "Физкультурно-спортивная", color: "orange"},
	{"value":273, "field": "Социально-педогагическая", color: "blue"}
];


var vis = d3.select('#chart')
	.append("svg:svg")
	.attr("class", "chart")
	.data([data])
	.attr("width", w+200)
	.attr("height", h+130)
	.append("svg:g")
	.attr("transform", "translate(" + r*1.1	 + "," + r*1.1 + ")");

var pie = d3.layout.pie()
	.value(function(d){
		return d.value;
	});

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

var arcBorder = d3.svg.arc()
    .innerRadius(r)
    .outerRadius(r + 6);

// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
	.data(pie)
	.enter()
	.append("svg:g")
	.attr("class", "slice");

arcs.append("svg:path")
    .attr("fill", function(d, i){
        return d.data.color;
    })
    .attr("d", function (d) {
        // log the result of the arc generator to show how cool it is :)
 //       console.log(arc(d));
        return arc(d);
    });

arcs.append("path")
    .attr("fill", "#000055")
    .attr("d", arcBorder);


// add the text

arcs.append("svg:text")
	.attr("fill", "#fff")
	.attr("transform", function(d){
		d.innerRadius = 100;
		d.outerRadius = r;
    	return "translate(" + arc.centroid(d) + ")";})
    		.attr("text-anchor", "middle")
    		.append("tspan")
    		.attr('y', -h/20)
    		.text( function(d, i) {
    			return data[i].value;
    		});
		

arcs.append("svg:text")
	.attr("fill", "#fff")
	.attr("transform", function(d){
		d.innerRadius = 100;
		d.outerRadius = r;
    	return "translate(" + arc.centroid(d) + ")";})
    		.attr("text-anchor", "middle")
    		.append("tspan")
    		.text( function(d, i) {
    			return plural_str(data[i].value, 'человек','человека','человек');
    		});
    		

		
var legend = d3.select("#chart")
	.append("svg")
	.attr("class", "legend")
	.attr("width", w/1.5)
	.attr("height", h)
	.selectAll("g")
	.data(data)
	.enter()
	.append("g")
	.attr("transform", function(d, i) { 
		return "translate(50," + (i * w/8 + 100) + ")"; 
	});
	


legend.append("rect")
      .attr("width", w/13)
      .attr("height", h/13)
      .data(data)
      .style("fill", function(d) { 
		return d.color; 
		});
      
legend.append("text")
	.attr("x", w/10)
	.attr("y", h/25)
	.attr("dy", ".35em")
	.data(data)
	.text(function(d) { 
		return d.field; 
	});