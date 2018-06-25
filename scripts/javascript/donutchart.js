function createDonutChart() {

    // variables needed to create the donut chart
    var w = 600,
    h = 500,
    radius = w / 2.35,
    donutValues = [],
    remaining,
    color = [],
    donutLabels = [],
    legendLabels = [];

    // remove previous donut chart
    d3.selectAll("#donutChart svg").remove("svg");

    // change the title of the map
    document.getElementById("donutChartTitle").innerHTML = ": " + country +
        " (" + year + ")";


    // loop to find the data needed to fill the donut chart
    for (var i = 0; i < agricultureLand.length; i++) {

        // check if data is available
        if (agricultureLand[i]["Country"] === String(country)) {
            donutValues.push(Number(agricultureLand[i][year]).toFixed(2))
            donutValues.push(Number(forestLand[i][year]).toFixed(2))

            // calculate remaining value and push all to a array
            remaining = 100 - donutValues[0] - donutValues[1]
            donutValues.push(remaining.toFixed(2))
            break;
        };
    };

    /*
        Check if the chosen year is 1990 or later.
        Data for forest area is not available before 1990.
    */
    if (year > 1989) {
        color = ["#fdae61", "#b2df8a", "#ffffb3"]
        donutLabels = [donutValues[0] + "%", donutValues[1] + "%", donutValues[2] + "%"]
        legendLabels = ["Agricultural land", "Forest area", "Other area"]
    }
    else {
        color = ["#fdae61", "#ffffb3"]
        donutValues = [donutValues[0], donutValues[2]]
        donutLabels = [donutValues[0]+ "%", donutValues[1] + "%"]
        legendLabels = ["Agricultural land", "Other area (including forest area)"]
    }

    // generate arc
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    var arcLabel = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40)

    var pie = d3.pie()
        .sort(null)
        .value(function(d){
            return d;
        });

    var toolTip = d3.select("#donutChart").append("div").attr("class", "toolTip")

    var svg = d3.select("#donutChart").append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(donutValues))
        .enter().append("g")
        .attr("class", "arc")
        .on('mousemove', function(d) {
            toolTip.text(d["value"] + "% of the total land area")
            .style("left", (d3.event.layerX + 3) + "px")
            .style('top', (d3.event.layerY + 10) + 'px')
            .style('display', 'block');
        })
        .on("mouseout", function(d) {
          toolTip.style("display", "none");
        });

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i){
            return color[i];
        })

    g.append("text")
      .attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d, i) { if (donutValues[i] > 3) {  return donutLabels[i]; }})

    var legendRectSize = 18,
    legendSpacing = 30,
    offset = 50;

    var legend = svg.selectAll('.legend')
      .data(color)
      .enter()
      .append('g')
      .attr('class', 'legend')
      .attr('transform', function(d, i) {
        var height = legendRectSize + legendSpacing;
        var horz = -4 * legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
      });

  legend.append('rect')
  .attr('width', legendRectSize)
  .attr('height', legendRectSize)
  .style('fill', function(d, i){
            return color[i];
        })

  legend.append('text')
  .attr('x', legendRectSize + legendSpacing)
  .attr('y', legendRectSize - legendSpacing + offset/2)
  .text(function(d, i) { return legendLabels[i]; })
};
