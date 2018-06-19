function createTimeSlider() {

  var years = d3.range(0, 51).map(function (d) { return new Date(1964 + d, 1, 1); });

  var timeSlider = d3.sliderHorizontal()
    .min(d3.min(years))
    .max(d3.max(years))
    .width(1400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(years)
    .on('onchange', val => {
      year = d3.timeFormat('%Y')(val)
      d3.selectAll("#selectCountry select").remove("select");
      document.getElementById("globeTitle").innerHTML = "Globe (" + year  + ")"
      document.getElementById("pieChartTitle").innerHTML = "Pie Chart: World (" + year  + ")";
      country = (document.getElementById("lineGraphTitle").innerHTML).replace("Line Graph: ", "")
      d3.selectAll("#lineGraph svg").remove("svg");
      d3.selectAll("#selectIndicator select").remove("select");
      createPieChart()
      createLineGraph();
      colorUpdate()
    });




  var g = d3.select("#timeSlider").append("svg")
    .attr("width", 1500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)");

  g.call(timeSlider);
};
