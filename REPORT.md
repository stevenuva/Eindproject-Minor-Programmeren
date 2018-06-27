# Project Report
## *Steven Kuhnen (10305882)*

### Short Description

The website allows the user to see whether population growth is outpacing agricultural production in (some parts of) the world and whether there are any indications that this might happen. The website itself consist out of three main visualizations:
- A globe (showing how densely populated some countries are)
- A line graph (comparing population growth with food production growth)
- A Donut Chart (showing how much of a countries land consists of agricultural land and forest)

Besides these three visualizations, there are also two dropdown menus (one to select countries on the globe, and one to change the variables depicted on the line graph) and a time slider. There is also a navbar at the top.

![drawn proposal](doc/single_screenshot.jpg)

*Note the screenshot does not show the whole webpage, just the three main components. The website itself is too big to capture with a single screenshot.*

### Technical Design: detailed

The website and its visualisations are created with javacript and with help of d3 and bootstrap.
In index.html, main.js, main.css you can find the main code to create the website and its visualization. Furthermore there are 4 extra js files, firstly because every main visualization (globe, donut chart, line graph) has its own javascript and css file, while there is also a timeslider.js. These helpers files contain functions that get called in the main files. Except for the index.html, every piece of code can be found in the folder "scripts".

#### convert_csv_to_json.py
Converts the datasets (csv format) from data.worldbank.org to a json file. Note that the Json file has been edited manually, if have changed the datasets own names to more readable names, this makes it easier to clean the data later in main.js with the function restructData()

#### index.html
- uses bootstrap to place all the visualizations and elements at the right places
- adds a navbar, foot-links, and popovers and text to the webpage
- lot of divs which will be used by javascript to append svg's with visualizations.

#### main.js
This file consist of the main code. From here other functions are called to create the visualisations that are depicted on the website. The file starts running when the user opens the website, with the window.onload function starts a chain of functions getting called. Functions also  has some global variables which are needed to run everything smoothly.

- Fistly there is the funtion loadData() which uses d3 queue to load a json file containing the data. This data is retrieved from a raw github link (from my own github). Finally the loadData function calls the function checkResponse().

- The checkResponse function push the data (if no error was thrown) to a array. This array will be cleaned and restructured with the restructData() function.

- The restructData() function pushes the 8 data sets that were available in the original json file, into its own separate array with help of javascripts eval function. For example the dataset called popDensity is stored in an array named popDensity. The restructData() function also calls the following functions:
    1 createGlobe(), found in globe.js
    2 createDonutChart(), found in donutChart.js
    3 createGradientLegend(), found in globe.js
    4 createLineGraph(), found in lineGraph.js
    5 createTimeSlider(), found in timeSlider.js

Besides that the restructData also calls a jquery function to initialize popovers after the visualizations have been created.

#### main.css
Adds style to the index.html and has the tooltip code which is used by the globe, the donut chart, and the line graph.

#### Globe (globe.js)
Contains global variables and the following function:
- function createGlobe(). Initializes a globe, with data from a chosen year (if not year = 1970). This function also creates another function to fill the colors of the countries on the globe with the function colorUpdate(). Also adds a dropdown menu with help of the select2 library. With this dropdown menu the user can select a country, after which the globe will rotate towards and focus on the selected country.
- function colorUpdate(). Fills the colors of the countries based on their population density in chosen year. Year variable change with the help of the time slider, which is created in timeslider.js.
- function createGradientLegend(). This function adds a gradient legend, giving more information about the colors that were used by the function colorUpdate().
On click on a country on the globe, the tooltip (div) will be called and the function createDonutChart(), and to draw new lines on the line graph the drawPath() function will be called.

#### Line Graph (linegraph.js)
Contains global variables and the following function:
- function createLineGraph(). Initializes a line graph with data from the world as a whole. Will show data from a specific country at the moment the user clicks on a country at the globe or uses the dropdown menu that was created in globe.js. The function createLineGraph() calls the function drawPath() to draw the lines on the line graph. Finally, the function createLineGraph() also adds a dropdown menu (with help of select2 library), which allows users to select the variables that will be depicted on the line graph.
- function drawPath() removes previous drawn lines and adds new lines based on the variables that were selected by the user in the drop down menu added above the line graph. Selecting a variable on this dropdown menu will call the function drawPath() again.

#### Donut Chart (donutChart.js)
Contains global variables and the following function:
- function createDonutChart(). Initializes a donut chart with data from the world as a whole. Will show data from a specific country at the moment the user clicks on a country at the globe or uses the dropdown menu that was created in globe.js. Furthermore, donutChart.js add a legend inside the donut-chart and uses a tooltip, which allows user to see the percentage of each piece of the donut chart when they hoover over a certain part of the donut chart.

#### Timeslider (timeslider.js)
Contains the function createTimeSlider(), this creates a time-slider which allows the user to select the year of which he/she wants to see the data. If the user does select a different year, then the colorUpdate() will called to edit the globe's color and data. Also the function createDonutChart() will be called to update the donut chart with the data of the chosen year.

#### CSS (globe.js, lineGraph.js, donutChart.css)
- Every visualization has its own css file
- Adds style for the visualizations

### Biggest challenge
The biggest challenge for me was to update the visualizations. In the beginning I wanted to work with parameters, but because of that my code became a bit sloppy. Because I work with five js files that all are linked together, it became clear that it would be easier to use global variables. With the global variables it became easier to update the visualizations, and most importantly to remember what the current chosen variables were. Before I used global variables my website would stop working if the user wanted to change variables for the second time. But by using global variables the memory needed to run my website did increase but at least the bugs were gone. If I had more time I would try to find a way to use less variables, which means that I would have to rewrite multiple js files.

### Other changes compared with Design.md:
- I also changed my initial idea of making a pie chart to making a donut chart. I found the donut chart easier to read and more visible pleasing.
- Finally, I found it challenging to add the instruction that needed to be written on the website which can help the user to understand how the visualizations work. I used Bootstrap to add popovers. By hoovering over the title of the visualizations the user is presented with an black textbox with the necessary instructions. By hiding the instructions behind a popover, the website kept its clean look.




