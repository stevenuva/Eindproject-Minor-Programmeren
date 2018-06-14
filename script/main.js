var jsonData = []


var popDenisty = []
var agricultureLand = []
var forestLand = []
var popTotal = []
var foodIndex = []
var cropIndex = []
var livestockIndex = []

// call function load data when page is loaded
window.onload = function() {
  loadData();
};

/**
 *  function which loads three json files
 *  calls another function to check the queue response
 */
function loadData() {
  d3.queue()
    .defer(d3.json, "world_bank_data.json")
    .awaitAll(checkResponse);
};

/**
 *  function checks if the queue response is vallid
 *  seperates the json data if response is vallid
 *  calls another function to clean the data
 */
function checkResponse(error, response) {
    if (error) throw error;
    else {
        // push the different json outputs to an array
        jsonData.push(response[0].data)
    };
    // console.log(jsonData)
    // clean the json data
    restructData(jsonData)

}

function restructData(data){

    var popDensity = []
    data[0].forEach(function(d) {
        eval(d["Series"]).push(d)
        // if (d["Series"] === "popDensity") {
        //     popDensity.push(d)
        // }
    })
    // console.log(popDensity)


    // popDensity.forEach(function(d) {
    //     if (d["Country"] === "Afghanistan") {
    //         console.log(d["2014"])
    //     }
    // })

    createGlobe(popDensity, popTotal, foodIndex, cropIndex, livestockIndex);
    createPieChart(agricultureLand, forestLand);
    createTimeSlider(popDensity, foodIndex, cropIndex, livestockIndex, agricultureLand, forestLand);
    createGradientLegend()
    createLineGraph(popTotal, foodIndex, cropIndex, livestockIndex, "World");
};

