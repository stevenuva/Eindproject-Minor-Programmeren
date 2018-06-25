// variables needed to make the globe work
var w = 600,
    h = 500,
    sens = 0.25,
    focused,
    countryId = {},
    countryFeatures,
    densityScore;

/*
  function to create a globe
  source: http://bl.ocks.org/KoGor/5994804
*/
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

    /*
      add drop down menu to the globe with the select2 library
      source: https://select2.org/getting-started/basic-usage
    */
    var countryDropDown = d3.select("#selectCountry").select("select")
        .attr("class", "countryDropDown").attr("name", "countryFeatures");

    // initialize a dropdown menu
    $(document).ready(function() {
        $('.countryDropDown').select2({ placeholder: "Select a country",
          dropdownAutoWidth : true, width: "auto"});
    });

    // load map and country names
    d3.queue()
        .defer(d3.json, "../data/world-110m.json")
        .defer(d3.tsv, "../data/world-110m.tsv")
        .await(loadGlobe);

    // load and draw the countries
    function loadGlobe(error, world, countryData) {

        // retrieve country data needed for drawing paths
        countryFeatures = topojson.feature(world, world.objects.countries)
                            .features;

        // add countries options to a dropdown menu with their id as value
        countryData.forEach(function(d) {
            countryId[d.id] = d.name;
            option = countryDropDown.append("option");
            option.text(d.name);
            option.property("value", d.id);
        });

        // draw the coutries
        var world = svg.selectAll("path.land")
        .data(countryFeatures)
        .enter().append("path")
        .attr("class", "land")
        .attr("d", path)

        /*
            Drag event function to allow user to rotate the globe when the mouse
            is placed on a country.
            source: http://bl.ocks.org/KoGor/5994804
        */
        .call(d3.drag()
            .subject(function() {
                var rotateDrag = projection.rotate();
                return {x: rotateDrag[0] / sens, y: -rotateDrag[1] / sens};
            })
            .on("drag", function() {
                var rotate = projection.rotate();
                projection.rotate([d3.event.x * sens, -d3.event.y * sens,
                rotate[2]]);
                svg.selectAll("path.land").attr("d", path);
                svg.selectAll(".focused").classed("focused", focused = false);
            })
        )

        // mouse events with a tooltip
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

        /*
            Click event updates the other visualizations.
            Click events also change the country which is highlighted.
        */
        .on("click", function(d, i) {
            svg.selectAll(".focused").classed("focused", focused = false);
            var tipText = "No data available"

            // check if useable data is available for a country
            popDensity.forEach(function(e) {
                if (e["Country"] == countryId[d.id]) {
                    if (e[year] > 0) {
                        tipText = parseFloat(e[year]).toFixed(2)
                    }
                }
            })

            // show textboxt with a countries population density
            toolTip.html(countryId[d.id] + ": " + tipText +
                " inhabitants per km<sup>2</sup>")
                .style("left", (d3.event.pageX + 7) + "px")
                .style("top", (d3.event.pageY - 15) + "px")

            // retrieve which country the user has selected
            country = countryId[d.id]

            // update the lines within the line graph and its title
            drawPath();
            document.getElementById("lineGraphTitle").innerHTML = ": " + country;

            // update the donut chart and its title
            createDonutChart();
            document.getElementById("globeTitle").innerHTML = ": " + country +
             " (" + year + ")";
        });

        /*
            Function called to fill the countries with a color based on their
            population density.
        */
        colorUpdate()


        /*
            Event when a country is selected which will rotate the globe and
            which will highlight the chosen country.
        */
        $(".countryDropDown").on("select2:select", function(){
            var rotate = projection.rotate()

            var focusedCountry = this[this.selectedIndex].value

            countryFeatures.forEach (function(d,i) {
                if(countryFeatures[i].id == focusedCountry) {
                    focusedCountry = countryFeatures[i];
                }
            });

            var project = d3.geoCentroid(focusedCountry);

            // ensures previous chosen country is no longer highlighted
            svg.selectAll(".focused").classed("focused", focused = false);

            // update global variable with the country that was selected
            country = this[this.selectedIndex].text

            // update the lines within the line graph and its title
            drawPath();
            document.getElementById("lineGraphTitle").innerHTML = ": "
            + country;

            // update the donut chart and its title
            createDonutChart();
            document.getElementById("globeTitle").innerHTML = ": " + country +
             " (" + year + ")";

            /*
              Transition function to rotate the globe smoothly and to highlight
              chosen country.
              source: http://bl.ocks.org/KoGor/5994804
            */
            (function transition() {
                d3.transition()
                  .duration(1000)
                  .tween("rotate", function() {
                      var rotateTransition = d3.interpolate(projection.rotate(),
                              [-project[0], -project[1]]);

                      // highlight chosen country
                      return function(e) {
                          projection.rotate(rotateTransition(e));
                          svg.selectAll("path").attr("d", path)
                             .classed("focused", function(d, i) { return d.id ==
                                focusedCountry.id ? focused = d : false; });
                      };
                  })
            })();
        });
      };
}

/*
    Function to color the countries on the globe based on their population
    density per km2.
*/
function colorUpdate() {

    // select the globe
    var svg = d3.select("#globe")

    // for the countries add a color based on their population density score
    svg.selectAll("path.land")
    .attr("fill", function(d) {

            // find the density score for a specific country
            popDensity.forEach(function(e) {
                if (e["Country"] == countryId[d.id]) {
                    densityScore = e[year]
                }
            })

            // determine the right color
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

            // return lightgrey if no data available
            else {
                return "lightgrey"
            }
            var densityScore = 0
        });
};

// function to add a gradient legend to the globe
function createGradientLegend() {

// add svg element
var svg = d3.select("#gradientLegend")
  .append("svg")
  .attr("id", "gradient")
  .attr("width", 380)
  .attr("height", 40);


/*
    Adds a defs element needed for the gradient legend.
    Source: https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient.html
*/
var defs = svg.append("defs");

// add  a linear gradient element to the defs
var linearGradient = defs.append("linearGradient")
    .attr("id", "linear-gradient");

// define direction of the gradient
linearGradient
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");

// add the color scale needed for the gradient
var colorScale = d3.scaleLinear()
    .range(["#ffffb2", "#fed976","#feb24c", "#fd8d3c", "#f03b20","#bd0026"]);

// set the color for the gradient from start to finish
linearGradient.selectAll("stop")
    .data( colorScale.range() )
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(colorScale.range().length-1); })
    .attr("stop-color", function(d) { return d; });

// draw the rectangle and fill it with the gradient
svg.append("rect")
    .attr("width", 350)
    .attr("height", 12)
    .style("fill", "url(#linear-gradient)");

// determine scale x-axis
var x = d3.scalePoint()
  .domain(["0", "50", "100", "150", "200", "250+"])
  .range([2,350])

// ticks with hardcoded values to the gradient
var axis = d3.axisBottom(x)
             .ticks(5)
             .tickValues(["0", "50", "100", "150", "200", "250+"]);

// add the axis with ticks
d3.select("#gradient")
        .attr("class", "axis")
        .attr("width", 380)
        .attr("height", 40)
    .append("g")
        .attr("id", "g-runoff")
        .attr("transform", "translate(0,20)")
        .call(axis);
};
