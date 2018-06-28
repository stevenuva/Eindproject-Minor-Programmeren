# Project Report
## *Steven Kuhnen (10305882)*

### Short Description

The website allows the user to see whether population growth is outpacing agricultural production in (some parts of) the world and/or if there are any indications that the current population growth trend might become problematic. The website itself consist out of three main visualizations:
- A globe (showing how densely populated some countries are)
- A line graph (comparing population growth with food production growth)
- A Donut Chart (showing how much of a countries land consists of agricultural land and forest)

Besides these three visualizations, there are also two dropdown menus (one to select countries on the globe, and one to change the variables depicted on the line graph) and a time slider. There is also a navbar at the top.

![drawn proposal](doc/single_screenshot.jpg)

*Note the screenshot does not show the whole webpage, just the three main components. The website itself is too big to capture with a single screenshot.*
___

### Technical Design

The website and its visualisations are created with javacript and with help of d3 and Bootstrap.
In index.html, main.js, main.css you can find the main code to create the website and its visualizations. There are 4 extra js files, three for every main visualization (globe, donut chart, line graph) and one for the timeslider. These helpers js files contain functions that get called in the main files. Furthermore there are three extra css files, one for every visualization. Except for the index.html, every piece of code can be found in the folder "scripts".

#### convert_csv_to_json.py
Converts the datasets (csv format) from data.worldbank.org to a json file. Note that the Json file has been edited manually, if have changed the datasets own names to more readable names, this makes it easier to clean the data later in main.js with the function restructData() and makes it easier to put every dataset in an array with the same name with help of the javascripts eval() function.

#### index.html
- uses bootstrap to place all the visualizations and elements at the right places on the website
- adds a navbar, foot-links, and popovers (activated by buttons) and text to the webpage
- lot of divs are found here, these will be used to append the svg's containing the visualizations.

#### main.js
This file consist of the main javascript code. From here other functions are called to create the visualisations that are depicted on the website. This file has some global variables which are needed to run everything smoothly. The file starts running when the user opens the website, with the window.onload function starts a chain of functions getting called.

- The first function that gets called is the funtion loadData() which uses d3 queue to load a json file containing the data from the world bank. This data is retrieved from a raw github link (from my own github) because github pages strangely enough did not want to accept this json file otherwise. When it is done, the loadData function calls the function checkResponse().

- The checkResponse function push the data (if no error was thrown) to a array. This array will be cleaned and restructured with the restructData() function.

- The restructData() function pushes the 8 data sets that were available in the original json file, into its own separate array with help of javascripts eval function. For example the dataset called popDensity is stored in an array named popDensity. The restructData() function also calls the following functions:
    1 createGlobe(), found in globe.js
    2 createDonutChart(), found in donutChart.js
    3 createGradientLegend(), found in globe.js
    4 createLineGraph(), found in lineGraph.js
    5 createTimeSlider(), found in timeSlider.js

Besides that the restructData also calls a jquery function to initialize popovers after the visualizations have been created. Popovers can be seen on the index.html by hoovering over the title of the visualizations (which is actually not a title but a button with text).

#### main.css
Adds style to the index.html and contains code for the tooltip which is used by the globe, the donut chart, and the line graph.

#### Globe (globe.js)
Contains global variables and the following function:
- function createGlobe(). Initializes a d3 globe, with data from a chosen year (if not year = 1970). This function also creates another function to fill the colors of the countries on the globe with the function colorUpdate(). Also adds a dropdown menu with help of the select2 library. With this dropdown menu the user can select a country, after which the globe will rotate towards and focus on the selected country.
- function colorUpdate(). Fills the colors of the countries based on their population density in chosen year. Year variable change with the help of the time slider, which is created in timeslider.js.
- function createGradientLegend(). This function adds a gradient legend, giving more information about the colors that were used by the function colorUpdate().
On click on a country on the globe, the tooltip (div) will be called and the function createDonutChart(), and to draw new lines on the line graph the drawPath() function will be called.

#### Line Graph (linegraph.js)
Contains global variables and the following function:
- function createLineGraph(). Initializes a line graph with data from the world as a whole. Will show data from a specific country at the moment the user clicks on a country at the globe or uses the dropdown menu that was created in globe.js. The function createLineGraph() calls the function drawPath() to draw the lines on the line graph. Finally, the function createLineGraph() also adds a dropdown menu (with help of select2 library), which allows users to select the variables that will be depicted on the line graph. This dropdown menu is placed just above the line graph svg.
- function drawPath() removes previous drawn lines and adds new lines based on the variables that were selected by the user in the drop down menu placed above the line graph. Selecting a variable on this dropdown menu will call the function drawPath() again and draw the line of the selected variable.

#### Donut Chart (donutChart.js)
Contains global variables and the following function:
- function createDonutChart(). Initializes a donut chart with data from the world as a whole. Will show data from a specific country at the moment the user clicks on a country at the globe or uses the dropdown menu that was created in globe.js. Furthermore, donutChart.js add a legend inside the donut-chart and uses a tooltip, which allows user to see the percentage of each piece of the donut chart when the user hoovers over a certain part of the donut chart with the mouse.

#### Timeslider (timeslider.js)
Contains the function createTimeSlider(), this creates a time-slider which allows the user to select the year of which he/she wants to see the data. If the user does select a different year, then the colorUpdate() will called to edit the globe's color and data. Also the function createDonutChart() will be called to update the donut chart with the data of the chosen year.

#### CSS (globe.js, lineGraph.js, donutChart.css)
- Every visualization has its own css file
- Adds style for the visualizations
___

### Challenges
The biggest challenge for me was to update the visualizations. In the beginning I wanted to work with parameters, but because of that my code became a bit sloppy. Because I work with five js files that all are linked together, it became clear that it would be easier to use global variables. With the global variables it became easier to update the visualizations, and most importantly to remember what the current chosen variables were. Before I used global variables my website would stop working if the user wanted to change variables for the second time. But by using global variables the memory needed to run my website did increase but at least the bugs were gone. If I had more time I would try to find a way to use less variables, which means that I would have to rewrite multiple js files.

Another challenge was to work with index numbers. For data concerning total food-, livestock- and crop-production there was only data available with index numbers. The average production between 2004 and 2006 was taken as the basic value (average 2004-2006 = 100), and every year was expressed in comparison with the basic value. Unfortunately, the data concerning the total population of a country in a specific year was not available with index numbers. With code that can be found in linegraph.js I have written (nested) back to back for loops to rewrite the population data to an index number, with the average of 2004-2006 as the basic value (100).

### Changes compared with Proposal and Design.md:
In proposal.md and design.md I proposed to give the user the option to change the variable that is depicted on the world map (from population density to the prevalence of undernourishment). This was optional, and I end I choose not to add this to the final product. In my opinion it would have made the website too crowded with dropdown menus, and secondly I would have had to add a lot of hardcoded variables to implement this option.

Another change is the navbar. I added this because it looks nice and it gives the user the option to move directly to a certain element on the website. The navbar does not scroll down aesthetic reasons. It may be less functional, but I personally think that the website becomes much uglier when the navbar is seen directly above the visualizations.

I also added textboxes beneath the donut chart and the linegraph, and text columns on the bottom of the page to add some storytelling to the website. And while text concerning the story can be seen on the website directly, text that gives instructions about how to use the visualizations are hidden with the help of Bootstrap popovers. When the user hoovers over the title of a visualizations, a popover will be shown with instructions how to use a certain visualization.


### Given More Time

If I had more time I would like to do more with bootstrap to add some more features to my website. Also would have changed the jumbotron header to something more visual pleasing with the help of Bootstrap Templates.

Also instead of removing the donut chart svg when the data is updated, I would have liked to add a smoother update/transition function.


