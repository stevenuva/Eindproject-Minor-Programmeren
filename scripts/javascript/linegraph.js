var chosenValue = foodIndex

var svg, toolTip, x , y, valueLine;

function createLineGraph(){


var allData = [foodIndex, cropIndex, livestockIndex]
var allDataText = ["Total Food Index", "Crop Index", "Livestock Index"]


    // popLine = []

    // popTotal.forEach(function(d, i) {
    //     if (d["Country"] === country) {
    //         // console.log(d)
    //         // console.log(d["Country"])
    //         var baseIndex = ((parseInt(d[2004]) + parseInt(d[2005])) + parseInt(d[2006]) ) / 3
    //         // console.log(baseIndex)
    //         for (var i = 1964; i <= 2014; i++) {
    //             indexNumber = (100 / baseIndex) * (parseInt(d[i]))
    //             popLine.push({"date" : i, "indexNumber" : indexNumber})
    //          }
    //     }
    // })
    // console.log(popLine)

    // console.log(document.getElementById("lineGraphTitle").innerHTML)

    countryDropDown = d3.select("#selectIndicator").append("select").attr("class", "js-example-basic-single2").attr("name", "indicator");


    $(document).ready(function() {
    $('.js-example-basic-single2').select2({dropdownAutoWidth : true, width: "auto"});
});

    allData.forEach(function(d, i) {
          option = countryDropDown.append("option");
          option.text(allDataText[i]);
          option.property("value", d[0]["Series"]);
        });

    // console.log(foodIndex)



    // console.log(chosenValue)

    foodLine = []

    chosenValue.forEach(function(d) {
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
    x = d3.scaleLinear().range([0, width]);
    y = d3.scaleLinear().range([height, 0]);

    // Define the line
    valueLine = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.indexNumber); });

    // Adds the svg canvas
    svg = d3.select("#lineGraph")
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
  y.domain([0, 200]);

  toolTip = d3.select("#lineGraph").append("div").attr("class", "toolTip")

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

    // svg.append("path")
    // .data([popLine])
    // .attr("class", "line")
    // .style("stroke", "red")
    // .attr("d", valueLine)
    // .on('mousemove', function(d) {
    //   toolTip.text(Math.round(x.invert(d3.mouse(this)[0])) + ": " + (y.invert(d3.mouse(this)[1]).toFixed(2)))
    //       .style("left", (d3.event.layerX + 3) + "px")
    //       .style('top', (d3.event.layerY + 10) + 'px')
    //       .style('display', 'block')
    //       .style("opacity", 1);

    // })
    // .on("mouseout", function(d) {
    //    toolTip.style("display", "none");
    // });


    drawPath()

      $(".js-example-basic-single2").on("select2:select", function(){
        console.log(this)
        console.log("test linegraph")
        // transation function ......
        chosenValue = eval(this.value)

        drawPath()

        //.......
    });
};


function drawPath(){

d3.select("#popLine").remove();

    popLine = []

    popTotal.forEach(function(d, i) {
        if (d["Country"] === country) {
            // console.log(d)
            // console.log(d["Country"])
            var baseIndex = ((parseInt(d[2004]) + parseInt(d[2005])) + parseInt(d[2006]) ) / 3
            // console.log(baseIndex)
            for (var i = 1964; i <= 2014; i++) {
                indexNumber = (100 / baseIndex) * (parseInt(d[i]))
                popLine.push({"date" : i, "indexNumber" : indexNumber})
             }
        }
    })

 svg.append("path")
    .data([popLine])
    .attr("class", "line")
    .attr("id", "popLine")
    .style("stroke", "red")
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

d3.select("#foodLine").remove();


foodLine = []

chosenValue.forEach(function(d) {
    if (d["Country"] === country) {
        for (var i = 1964; i <= 2014; i++) {
            foodLine.push({"date" : i, "indexNumber" : d[i]})
         }
   }
})

svg.append("path")
    .data([foodLine])
    .attr("class", "line")
    .attr("id", "foodLine")
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
}
