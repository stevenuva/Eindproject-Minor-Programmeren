// global variables needed to run other scripts properly
var country = "World",
popDensity = [],
agricultureLand = [],
forestLand = [],
popTotal = [],
foodIndex = [],
cropIndex = [],
livestockIndex = [],
year = 1970;

// call function to load data when page is loaded
window.onload = function() {
  loadData();
};

/**
 *  Function which loads three json files.
 *  Calls another function to check the queue response.
 */
function loadData() {
  d3.queue()
    .defer(d3.json, "../data/world_bank_data.json")
    .awaitAll(checkResponse);
};

/**
 *  Function checks if the queue response is vallid.
 *  Seperates the json data if response is vallid.
 *  Calls another function to store the data
 */
function checkResponse(error, response) {
    var jsonData = []
    if (error) throw error;
    else {

        // push the different json outputs to an array
        jsonData.push(response[0].data)
    };

    // call funtion to clean the json data
    restructData(jsonData)

}

// function to store the data
function restructData(data){

    // store each data serie into an array with the same name
    data[0].forEach(function(d) {
        eval(d["Series"]).push(d)
    })

    // call functions to draw the visualizations
    createGlobe();
    createDonutChart();
    createGradientLegend()
    createLineGraph();
    createTimeSlider();

    // add popovers after the visualizations are created
    $(document).ready(function(){
    $('[data-toggle="popover"]').popover();
});
};
