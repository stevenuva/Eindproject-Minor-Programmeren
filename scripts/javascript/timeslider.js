/*
    timeslider.js
    Final Project Minor Programmeren
    Steven Kuhnen (10305882)

    Creates a time slider and calls other functions to update other visualizations when needed.
*/

function createTimeSlider() {

    // determine the number of years and the starting year of the time slider
    var years = d3.range(0, 51).map(function (d) {
                    return new Date(1964 + d, 1, 1);
                });

    /*
        Determine size and ticks on the time slider.
        On change event update other visualizations with data from the chosen
        year.
        Source: https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518
    */
    var timeSlider = d3.sliderHorizontal()
        .min(d3.min(years))
        .max(d3.max(years))
        .width(1400)
        .tickFormat(d3.timeFormat('%Y'))
        .tickValues(years)
        .on('onchange', val => {

            // retrieve which year was selected
            year = d3.timeFormat('%Y')(val)

            // change year in globe title and update data to fill the globe
            document.getElementById("globeTitle").innerHTML = " (" + year  + ")"
            colorUpdate();

            /*
                Change year in the donut chart title and update data needed to
                refill the donut chart.
            */
            document.getElementById("donutChartTitle").innerHTML = ": " +
                country + "(" + year  + ")";
            createDonutChart();
    });

    // create svg for the time slider
    var svg = d3.select("#timeSlider").append("svg")
        .attr("width", 1500)
        .attr("height", 100)
        .append("g")
        .attr("transform", "translate(30,30)");

    // add timeslider to the svg
    svg.call(timeSlider);
};
