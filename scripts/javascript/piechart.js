function createPieChart() {



    console.log(popDensity)


    d3.selectAll("#pieChart svg").remove("svg");
     // change the title of the map
    document.getElementById("pieChartTitle").innerHTML = "Donut Chart: " + country + " (" + year + ")";

    var w = 600,
    h = 500,
    radius = w / 2.35;

    var pieValues = []

    agricultureLand.forEach(function(d) {
        if (d["Country"] === String(country)) {
            pieValues.push(Number(d[year]).toFixed(2))
        }
    })

    forestLand.forEach(function(d) {
        if (d["Country"] === String(country)) {
            pieValues.push(Number(d[year]).toFixed(2))
        }
    })

    var remaining = 100 - pieValues[0] - pieValues[1]
    pieValues.push(remaining.toFixed(2))

    var color = []

    var legendLabels = []
    var pieLabels = []

    if (year > 1989) {
        legendLabels = ["Agricultural land", "Forest area", "Other area"]
        color = ["#fdae61", "#b2df8a", "#ffffb3"]
        pieLabels = [pieValues[0] + "%", pieValues[1] + "%", pieValues[2] + "%"]
    }
    else {
        var oValues = [pieValues[0], pieValues[2]]
        color = ["#fdae61", "#ffffb3"]
        pieLabels = [pieValues[0]+ "%", pieValues[2] + "%"]
        legendLabels = ["Agricultural land", "Other area (including forest area)"]
        pieValues = []
        pieValues = oValues
        console.log(pieValues)
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

    var toolTip = d3.select("#pieChart").append("div").attr("class", "toolTip")

    var svg = d3.select("#pieChart").append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(pieValues))
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
      .text(function(d, i) { if (pieValues[i] > 2) {  return pieLabels[i]; }})


        var legendRectSize = 18;
        var legendSpacing = 30;
        var offset = 50;

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

