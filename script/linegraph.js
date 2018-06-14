function createLineGraph(popTotal, foodIndex, cropIndex , livestockIndex , country = "World"){

var allData = [foodIndex, cropIndex, livestockIndex]
var allDataText = ["Total Food Index", "Crop Index", "Livestock Index"]


    // change the title of the map
    document.getElementById("lineGraphTitle").innerHTML = "Line Graph: " + country;

    countryDropDown = d3.select("#selectIndicator").append("select").attr("name", "indicator");

    allData.forEach(function(d, i) {
          option = countryDropDown.append("option");
          option.text(allDataText[i]);
          option.property("value", d[0]["Series"]);
        });


    d3.select("#selectIndicator").on("change", function() {
        console.log(this)
        console.log("ok")
    });

    foodLine = []

    foodIndex.forEach(function(d) {
        if (d["Country"] === country) {
            for (var i = 1964; i <= 2014; i++) {
                foodLine.push({"date" : i, "indexNumber" : d[i]})
             }
       }
    })

    // console.log(foodLine)


    // Set the dimensions of the canvas / graph
    var margin = {top: 30, right: 20, bottom: 40, left: 50},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // Set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Define the line
    var valueLine = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.indexNumber); });

    // Adds the svg canvas
    var svg = d3.select("#lineGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");




     // Scale the range of the data
    x.domain([d3.min(foodLine, function(d) {
    // console.log(d.date)
   return d.date; }), d3.max(foodLine, function(d) { return d.date; })]);
  y.domain([0, 160]);

  var toolTip = d3.select("#lineGraph").append("div").attr("class", "toolTip")

  // Add the valueline path.
  svg.append("path")
      .data([foodLine])
      .attr("class", "line1")
      .attr("d", valueLine)
      .on('mousemove', function(d) {
        toolTip.text(Math.round(x.invert(d3.mouse(this)[0])) + ": " + (y.invert(d3.mouse(this)[1]).toFixed(2)))
            .style("left", (d3.event.layerX + 3) + "px")
            .style('top', (d3.event.layerY + 10) + 'px')
            .style('display', 'block')
            .style("opacity", 1);

      })
      .on("mouseout", function(d) {
         toolTip.style("display", "none");
      });

    var xAxis = d3.axisBottom(x)
                .tickFormat(function(d){
                    return d;
       })

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
};
