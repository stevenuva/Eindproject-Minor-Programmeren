function createLineGraph(popDensity, foodIndex, country = "World"){

    // change the title of the map
    document.getElementById("lineGraphTitle").innerHTML = "Line lineGraph: " + country + " (" + year + ")";

    var w = 600,
    h = 500;

    var svg = d3.select("#lineGraph").append("svg")
                .attr("width", w)
                .attr("height", h);
};
