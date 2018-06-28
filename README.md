# Project
## *Steven Kuhnen (10305882)*
## **Agriculture and Population growth: How sustainable is the current population growth**

[Visit my Website!](https://stevenuva.github.io/project/)
___

Video about the website: https://vimeo.com/277494021
___

### Introduction
In 1799 demographer Thomas Malthus predicted that in the future there will come a day when there will not be enough food produced to feed everybody, and that too much land is being used for agriculture. The website illustrates whether population growth is indeed outpacing agricultural production in (some parts of) the world. People who are interested in topics like sustainability will see whether there are indeed any indications that indicate that Malthus might be right and that overpopulation is or will be a real problem. This will be done by looking at the population density, total population growth and comparing this among others with the total food production growth.

#### Main features

- Globe which will show the population density of a country when you click on a country. The population density of a country in a certain year also determines which color the country will be filled with. The globe will also update the other visualizations when you click on a country.

![drawn proposal](doc/globe-initial-view.jpg)
___
- User can select from which year the data will be shown. This will update the donut chart and the globe.
- User can also select a country of which they want more information about by selecting the country in the dropdown menu.

![drawn proposal](doc/time-slider-selector-view.jpg)
___
- Line graph, which compares the total population with the total food produced per country over a couple of decades. User selects the country on the globe or in the dropdown menu beneath the globe.
- Donut Chart, which will illustrates how much land is being used in a certain year for agriculture in a certain country. Also shows decline in forest area, which can be a sign of overpopulation.

![drawn proposal](doc/line-graph-initial-view.jpg)
___

- User can also edit the variables being shown in the line graph. User can choose to replace the total food data with either crop- or livestock production data. This can be done by selecting a variable just above the line graph

- By hoovering over a button ("Globe", "Time Slider", "Donut Chart", "Line Graph"), the user activates a popover which gives instruction how to use the visualization.
![drawn proposal](doc/update-and-popover.jpg)
___

### Data Sources
Datasets from the World Bank (https://data.worldbank.org/indicator) have been used. The datasets were available in csv-format.

#### Datasets for the map/globe:
- [Population density (people per sq. km of land area)](https://data.worldbank.org/indicator/EN.POP.DNST?view=chart)

#### Datasets for the donut chart
- [Agricultural land (% of land area)](https://data.worldbank.org/indicator/AG.LND.AGRI.ZS?view=chart)
- [Forest area (% of land area)](https://data.worldbank.org/indicator/AG.LND.FRST.ZS?view=chart)

#### Datasets for the line graph
- [Population, total](https://data.worldbank.org/indicator/SP.POP.TOTL?view=chart) (note: index will be calculated and used for the line graph)
- [Food production index (2004 – 2006 = 100)](https://data.worldbank.org/indicator/AG.PRD.FOOD.XD?view=chart)
- [Crop production index (2004 – 2006 = 100)](https://data.worldbank.org/indicator/AG.PRD.CROP.XD?view=chart)
- [Livestock production index (2004 – 2006 = 100)](https://data.worldbank.org/indicator/AG.PRD.LVSK.XD?view=chart)
___

### Code Sources
- Donut chart (https://www.youtube.com/watch?v=kK5kKA-0PUQ) (No License)
- Line Graph (https://bl.ocks.org/d3noob/4db972df5d7efc7d611255d1cc6f3c4f) (No License)
- Gradient (https://www.visualcinnamon.com/2016/05/smooth-color-legend-d3-svg-gradient.html) (No License)
- Earth globe (https://bl.ocks.org/KoGor/5994804) (MIT License)
- Slider (https://bl.ocks.org/johnwalley/e1d256b81e51da68f7feb632a53c3518) (BSD 3-Clause License)
___

### External components
- Ajax
- Bootstrap, Version 3
- jQuery
- D3, Version 4
- D3 simple-slider, Version 0.2.1
- D3 topojson (https://github.com/topojson/topojson)
- Select2 library (MIT License)
___

### References Storytelling
- Acciona (https://www.activesustainability.com/sustainable-development/malthus-food-production-population-growth)
- Help Save Nature(https://helpsavenature.com/how-is-deforestation-related-to-population-growth)
- New York Times (https://www.nytimes.com/2015/06/01/us/the-unrealized-horrors-of-population-explosion.html)
- Scientific American (https://www.scientificamerican.com/article/are-malthus-predicted-1798-food-shortages)
- "Signs of overpopulation", Raoul Pop(https://raoulpop.com/2009/04/02/signs-of-overpopulation/)

