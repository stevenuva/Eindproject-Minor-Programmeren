function createTimeSlider(popDensity, foodIndex, cropIndex, livestockIndex, agricultureLand, forestLand){

  var years = d3.range(0, 51).map(function (d) { return new Date(1964 + d, 1, 1); });

  var timeSlider = d3.sliderHorizontal()
    .min(d3.min(years))
    .max(d3.max(years))
    .width(1400)
    .tickFormat(d3.timeFormat('%Y'))
    .tickValues(years)
    .on('onchange', val => {
      // change the title of the map
      d3.selectAll("#globe svg").remove("svg");
      d3.selectAll("#selectCountry select").remove("select");
      document.getElementById("globeTitle").innerHTML = "Globe (" + (d3.timeFormat('%Y')(val))  + ")"
      document.getElementById("pieChartTitle").innerHTML = "Pie Chart: World (" + (d3.timeFormat('%Y')(val))  + ")";
      createPieChart(agricultureLand, forestLand, country = "World", year = d3.timeFormat('%Y')(val))
      createGlobe(popDensity, popTotal, foodIndex, cropIndex, livestockIndex, year = d3.timeFormat('%Y')(val));
       console.log(d3.timeFormat('%Y')(val));
    });




  var g = d3.select("#timeSlider").append("svg")
    .attr("width", 1500)
    .attr("height", 100)
    .append("g")
    .attr("transform", "translate(30,30)");

  g.call(timeSlider);
};
