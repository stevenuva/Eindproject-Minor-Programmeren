var w = 600,
    h = 500,
    sens = 0.25,
    focused;

var countryId = {}

function createGlobe() {

    // create svg for the globe
    var svg = d3.select("#globe").append("svg")
        .attr("width", w)
        .attr("height", h);

    // projection for the globe
    var projection = d3.geoOrthographic ()
        .scale(250)
        .translate([w / 2, h / 2])
        .clipAngle(90);

    var path = d3.geoPath()
        .projection(projection);

    // draw water
    svg.append("path")
        .datum({type: "Sphere"})
        .attr("class", "water")
        .attr("d", path);

    // add tooltip to the globe
    var toolTip = d3.select("#globe").append("div").attr("class", "toolTip")

    // add drop down menu to the globe
    var countryDropDown = d3.select("#selectCountry").append("select").attr("class", "js-example-basic-single").attr("name", "countries");

$(document).ready(function() {
    $('.js-example-basic-single').select2({dropdownAutoWidth : true, width: "auto"});
});

    // load map and country names
    d3.queue()
        .defer(d3.json, "world-110m.json")
        .defer(d3.tsv, "world-110m.tsv")
        .await(ready);

      //Main function

      function ready(error, world, countryData) {


        // var test = []
        // countryData.forEach(function(d) {
        // test.push(d.name)
        // })
        // // console.log(test)

        var countries = topojson.feature(world, world.objects.countries).features;


        //Adding countries to select

        countryData.forEach(function(d) {
          countryId[d.id] = d.name;
          option = countryDropDown.append("option");
          option.text(d.name);
          option.property("value", d.id);
        });


        // console.log(countryData)
        //Drawing countries on the globe
        var densityScore;

        var world = svg.selectAll("path.land")
        .data(countries)
        .enter().append("path")
        .attr("class", "land")
        .attr("d", path)

        //Drag event

        .call(d3.drag()
            .subject(function() { var r = projection.rotate(); return {x: r[0] / sens, y: -r[1] / sens}; })
            .on("drag", function() {
              var rotate = projection.rotate();
              projection.rotate([d3.event.x * sens, -d3.event.y * sens, rotate[2]]);
              svg.selectAll("path.land").attr("d", path);
              svg.selectAll(".focused").classed("focused", focused = false);
            }))


        //Mouse events

        .on("mouseover", function(d) {
          toolTip.text(countryId[d.id])
          .style("left", (d3.event.pageX + 7) + "px")
          .style("top", (d3.event.pageY - 15) + "px")
          .style("display", "block")
          .style("opacity", 1);
        })
        .on("mouseout", function(d) {
          toolTip.style("opacity", 0)
          .style("display", "none");
        })
        .on("click", function(d) {
            var tiptext = "No data available"
            popDensity.forEach(function(e) {
                if (e["Country"] == countryId[d.id]) {
                    tiptext = parseFloat(e[year]).toFixed(2)
                    // console.log(densityScore)
                }
            })
          toolTip.html(countryId[d.id] + ": " + tiptext + " inhabitants per km<sup>2</sup>")
          toolTip.style("left", (d3.event.pageX + 7) + "px")
          .style("top", (d3.event.pageY - 15) + "px")
          // d3.selectAll("#selectIndicator select").remove("select");
          country = countryId[d.id]
          drawPath();
              // change the title of the map
    document.getElementById("lineGraphTitle").innerHTML = "Line Graph: " + country;
          createPieChart();
          document.getElementById("globeTitle").innerHTML = "Globe: " + country + " (" + year + ")";
        });

        colorUpdate()

        // selectttttttttt
        // country focus on option select

        $(".js-example-basic-single").on("select2:select", function(){
          console.log(this)
          // console.log(this.value)
          // console.log("Value", this[this.value])
          // console.log("TEST", this[this.selectedIndex].text)

          country = this[this.selectedIndex].text

          var rotate = projection.rotate(),
          focusedCountry = countryFocus(countries, this),
          p = d3.geoCentroid(focusedCountry);





          // d3.selectAll("#selectIndicator select").remove("select");
          drawPath()
              // change the title of the map
    document.getElementById("lineGraphTitle").innerHTML = "Line Graph: " + country;
          createPieChart()
          colorUpdate()

          svg.selectAll(".focused").classed("focused", focused = false);

        //Globe rotating

        (function transition() {
          // console.log("transition")
          d3.transition()
          .duration(1000)
          .tween("rotate", function() {
            var r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
            return function(t) {
              projection.rotate(r(t));
              svg.selectAll("path").attr("d", path)
              .classed("focused", function(d, i) { return d.id == focusedCountry.id ? focused = d : false; });
            };
          })
          })();
        });

        function countryFocus(countries, self) {
          for(var i = 0; i < countries.length; i++) {
            if(countries[i].id == self.value) {return countries[i];}
          }
        };

      };
}

function createGradientLegend(){

var svg = d3.select("#gradientLegend")
  .append("svg")
  .attr("id", "gradient")
  .attr("width", 380)
  .attr("height", 40);


//Append a defs (for definition) element to your SVG
var defs = svg.append("defs");

//Append a linearGradient element to the defs and give it a unique id
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

  //A color scale
var colorScale = d3.scaleLinear()
    .range(["#ffffb2", "#fed976","#feb24c", "#fd8d3c", "#f03b20","#bd0026"]);


linearGradient.selectAll("stop")
    .data( colorScale.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
    .attr("stop-color", function(d) { return d; });

  //Draw the rectangle and fill with gradient
svg.append("rect")
    .attr("width", 350)
    .attr("height", 12)
    .style("fill", "url(#linear-gradient)");

var x = d3.scaleLinear()
  .domain([0,250])
  .range([2,350])

var xtest = d3.scalePoint()
  .domain(["0", "50", "100", "150", "200", "250+"])
  .range([2,350])

var axis = d3.axisBottom(xtest)
             .ticks(5)
             .tickValues(["0", "50", "100", "150", "200", "250+"]);

d3.select("#gradient")
        .attr("class", "axis")
        .attr("width", 380)
        .attr("height", 40)
    .append("g")
        .attr("id", "g-runoff")
        .attr("transform", "translate(0,20)")
        .call(axis);
};

function colorUpdate() {

    var svg = d3.select("#globe")

    svg.selectAll("path.land")
    .attr("fill", function(d) {
            // console.log(countryId[d.id])
            popDensity.forEach(function(e) {
                if (e["Country"] == countryId[d.id]) {
                    densityScore = e[year]
                    // console.log(densityScore)
                }
            })
            if (densityScore > 0) {
                switch (true) {
                    case (densityScore <= 25):
                        return "#ffffb2"
                    case (densityScore <= 50):
                        return "#fed976"
                    case (densityScore <= 100):
                        return "#feb24c"
                    case (densityScore <= 150):
                        return "#fd8d3c"
                    case (densityScore <= 200):
                        return "#f03b20"
                    default:
                        return "#bd0026"
                }
            }
            else {
                return "lightgrey"
            }
            var densityScore = 0
        });
}
