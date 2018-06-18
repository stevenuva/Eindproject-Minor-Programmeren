var w = 600,
    h = 500,
    sens = 0.25,
    focused;


function createGlobe(popDensity, popTotal, foodIndex, cropIndex, livestockIndex, year = 2014) {


    console.log(popDensity)






      //SVG container
      var svg = d3.select("#globe").append("svg")
                  .attr("width", w)
                  .attr("height", h);

      //Setting projection
      var projection = d3.geoOrthographic ()
        .scale(250)
        .translate([w / 2, h / 2])
        .clipAngle(90);

      var path = d3.geoPath()
        .projection(projection);

      //Adding water

      svg.append("path")
        .datum({type: "Sphere"})
        .attr("class", "water")
        .attr("d", path);

      var toolTip = d3.select("#globe").append("div").attr("class", "toolTip")

      // if (typeof countryDropDown !== 'undefined') {
        var countryDropDown = d3.select("#selectCountry").append("select").attr("name", "countries");


       d3.queue()
          .defer(d3.json, "world-110m.json")
          .defer(d3.tsv, "world-110m.tsv")
          .await(ready);

      //Main function

      function ready(error, world, countryData) {


        var test = []
        countryData.forEach(function(d) {
        test.push(d.name)
        })
        // console.log(test)


        var countryId = {},
        countries = topojson.feature(world, world.objects.countries).features;


        //Adding countries to select

        countryData.forEach(function(d) {
          countryId[d.id] = d.name;
          option = countryDropDown.append("option");
          option.text(d.name);
          option.property("value", d.id);
        });


        // console.log(countryData)
        //Drawing countries on the globe
        var testColor;

        var world = svg.selectAll("path.land")
        .data(countries)
        .enter().append("path")
        .attr("class", "land")
        .attr("d", path)
        .attr("fill", function(d) {
            console.log(countryId[d.id])
            popDensity.forEach(function(e) {
                if (e["Country"] == countryId[d.id]) {
                    testColor = e[year]
                    console.log(testColor)
                }
            })
            if (testColor > 0) {
                switch (true) {
                    case (testColor <= 25):
                        return "#ffffb2"
                    case (testColor <= 50):
                        return "#fed976"
                    case (testColor <= 100):
                        return "#feb24c"
                    case (testColor <= 150):
                        return "#fd8d3c"
                    case (testColor <= 200):
                        return "#f03b20"
                    default:
                        return "#bd0026"
                }
            }
            else {
                return "grey"
            }
            var testColor = 0
        })

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
          toolTip.text(countryId[d.id])
          toolTip.style("left", (d3.event.pageX + 7) + "px")
          .style("top", (d3.event.pageY - 15) + "px")
          d3.selectAll("#lineGraph svg").remove("svg");
          d3.selectAll("#selectIndicator select").remove("select");
          createLineGraph(popTotal, foodIndex, cropIndex, livestockIndex, countryId[d.id]);
        });

        //Country focus on option select

        d3.select("select").on("change", function() {
          // console.log(this)
          // console.log(this.value)
          // console.log("Value", this[this.value])
          // console.log("TEST", this[this.selectedIndex].text)

          passCountry = this[this.selectedIndex].text

          var rotate = projection.rotate(),
          focusedCountry = country(countries, this),
          p = d3.geoCentroid(focusedCountry);





          d3.selectAll("#lineGraph svg").remove("svg");
          d3.selectAll("#selectIndicator select").remove("select");
          createLineGraph(popTotal, foodIndex, cropIndex, livestockIndex, passCountry)

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

        function country(countries, self) {
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


var axis = d3.axisBottom(x)
             .ticks(5);

d3.select("#gradient")
        .attr("class", "axis")
        .attr("width", 380)
        .attr("height", 40)
    .append("g")
        .attr("id", "g-runoff")
        .attr("transform", "translate(0,20)")
        .call(axis);
};
