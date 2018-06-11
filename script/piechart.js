function createPieChart(agrData, forestData, country = "World", year = 2014){

    var w = 600,
    h = 500,
    radius = w / 2.35;

    var pieValues = []

    agrData.forEach(function(d) {
        if (d["Country"] === String(country)) {
            pieValues.push(Number(d[year]).toFixed(2))
        }
    })

    forestData.forEach(function(d) {
        if (d["Country"] === String(country)) {
            pieValues.push(Number(d[year]).toFixed(2))
        }
    })

    var color = ["#fdae61", "#b2df8a", "#ffffb3"]

    var pieLabels = ["Agricultural land", "Forest area", "Other area"]

    var remaining = 100 - pieValues[0] - pieValues[1]
    pieValues.push(remaining.toFixed(2))
    console.log(pieValues)
    // generate arc
    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);
        // .startAngle()
        // .endAngle()

    var arcLabel = d3.arc()
        .outerRadius(radius - 100)
        .innerRadius(radius - 100)

    var pie = d3.pie()
        .sort(null)
        .value(function(d){
            return d;
        });

    var svg = d3.select("#pieChart").append("svg")
            .attr("width", w)
            .attr("height", h)
            .append("g")
            .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(pieValues))
        .enter().append("g")
        .attr("class", "arc")

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d, i){
            return color[i];
        })


    g.append("text")
      .attr("transform", function(d) { return "translate(" + arcLabel.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d, i) { return pieLabels[i]; })

};
