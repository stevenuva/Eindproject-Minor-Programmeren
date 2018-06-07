var jsonData = []

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
    var dataGlobe = []
    for (var i = 0; i < data[0].length; i++) {
        if(data[0][i]["Series Code"] == "EN.POP.DNST"){
            dataGlobe.push(data[0][i])
        }
    }
    console.log(dataGlobe)
};
