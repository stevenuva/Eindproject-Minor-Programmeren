// global variables needed to create the linegraph
var chosenValue = foodIndex,
chosenText = "Total Food Index",
svg,
toolTip,
x,
y,
valueLine;

// function which creates a line graph
function createLineGraph() {

    // variable needed to draw line for the chosen food variable
    var foodLine = []

    // variables needed for the dropdown menu
    var dropDownData = [foodIndex, cropIndex, livestockIndex],
    dropDownText = ["Total Food Index", "Crop Index", "Livestock Index"];

    // select elemetn for the drop down menu
    var indicatorDropDown = d3.select("#selectIndicator")
                              .select("select")
                              .attr("class", "indicatorDropdown")
                              .attr("name", "indicator");

    // initialize the drop down menu
    $(document).ready(function() {
        $('.indicatorDropdown').select2({dropdownAutoWidth : true,
          placeholder: "Select an indicator", width: "auto"});
    });

    // add options to the drop down menu
    dropDownData.forEach(function(d, i) {
          option = indicatorDropDown.append("option");
          option.text(dropDownText[i]);
          option.property("value", d[0]["Series"]);
    });

    // loop through chosen food variables dataset and re
    chosenValue.forEach(function(d) {
        if (d["Country"] === country) {
            for (var i = 1964; i <= 2014; i++) {
                foodLine.push({"date" : i, "indexNumber" : d[i]})
             }
       }
    });

    // determine the size and the margins for the graph
    var margin = {top: 30, right: 20, bottom: 40, left: 50},
        width = 600 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // determine the x and y scale
    x = d3.scaleLinear().range([0, width]);
    y = d3.scaleLinear().range([height, 0]);

    // define the line
    valueLine = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.indexNumber); });

    // add the svg
    svg = d3.select("#lineGraph")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");

    // determain the domain of the data
    x.domain([d3.min(foodLine, function(d) {return d.date; }),
        d3.max(foodLine, function(d) { return d.date; })]);
    y.domain([0, 200]);

    toolTip = d3.select("#lineGraph").append("div").attr("class", "toolTip")

    // x axis with ticks
    var xAxis = d3.axisBottom(x)
        .tickFormat(function(d) {
            return d;
        });

    // add the x axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // add the y axis
    svg.append("g")
        .call(d3.axisLeft(y));

    // add text to the x axis
    svg.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + 35) + ")")
        .style("text-anchor", "middle")
        .text("Year");

    // add text ti the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Index Number (2004 - 2006 = 100)");

    // call function to draw the value lines on the line graph
    drawPath()

    /*
        Event when user selects a option inside the drop down menu.
        Draw new lines based on the value that was chosen by the user.
    */
    $(".indicatorDropdown").on("select2:select", function() {
        chosenValue = eval(this.value)
        chosenText = this.options[this.selectedIndex].text
        drawPath()
    });
};

// function that draws the lines on the line graph
function drawPath() {

    // variables needed to draw the lines
    var w = 500,
    popLine = [],
    foodLine = [];

    // remove previous lines and their labels
    d3.select("#foodLine").remove();
    d3.select("#popLine").remove();
    d3.select("#foodLineText").remove();
    d3.select("#popLineText").remove();

    /*
        Need to calculate the base index for the total population for the
        chosen country.
        Base index is the average between 2004 and 2006.
        Data did not provide this.
    */
    popTotal.forEach(function(d, i) {
        if (d["Country"] === country) {
            var baseIndex = ((parseInt(d[2004]) + parseInt(d[2005])) +
               parseInt(d[2006]) ) / 3

            // convert every years total population to an index number
            for (var i = 1964; i <= 2014; i++) {
                indexNumber = (100 / baseIndex) * (parseInt(d[i]))
                popLine.push({"date" : i, "indexNumber" : indexNumber})
            };
        };
    });

    // draw new line for the population data
   svg.append("path")
      .data([popLine])
      .attr("class", "line")
      .attr("id", "popLine")
      .style("stroke", "red")
      .attr("d", valueLine)

      // mouse move over the line will show the index number
      .on('mousemove', function(d) {
        toolTip.text( "Total Population Index (" +
                Math.round(x.invert(d3.mouse(this)[0])) + "): " +
                (y.invert(d3.mouse(this)[1]).toFixed(2)))
            .style("left", (d3.event.layerX + 3) + "px")
            .style('top', (d3.event.layerY + 10) + 'px')
            .style('display', 'block')
            .style("opacity", 1);

      })
      .on("mouseout", function(d) {
         toolTip.style("display", "none");
    });

    // retrieve data from the dataset of the chosen value and add to an array
    chosenValue.forEach(function(d) {
        if (d["Country"] === country) {
            for (var i = 1964; i <= 2014; i++) {
                foodLine.push({"date" : i, "indexNumber" : d[i]})
            };
        };
    });

    // draw new line for the chosen variables data
    svg.append("path")
        .data([foodLine])
        .attr("class", "line")
        .attr("id", "foodLine")
        .attr("d", valueLine)

        // mouse move over the line will show the index number
        .on('mousemove', function(d) {
          toolTip.text(chosenText + " (" + Math.round(x.invert(d3.mouse(this)[0]))
                  + "): " + (y.invert(d3.mouse(this)[1]).toFixed(2)))
              .style("left", (d3.event.layerX + 3) + "px")
              .style('top', (d3.event.layerY + 10) + 'px')
              .style('display', 'block')
              .style("opacity", 1);

        })
        .on("mouseout", function(d) {
           toolTip.style("display", "none");
        });

    // add label to the chosen value line
    svg.append("text")
      .attr("id", "foodLineText")
      .attr("transform", "translate("+(w - 80)+","+ 420+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "steelblue")
      .text(chosenText);

    // add label to the total population line
    svg.append("text")
      .attr("id", "popLineText")
      .attr("transform", "translate("+(w - 80)+","+ 400+")")
      .attr("dy", ".35em")
      .attr("text-anchor", "start")
      .style("fill", "red")
      .text("Population Index");
};
